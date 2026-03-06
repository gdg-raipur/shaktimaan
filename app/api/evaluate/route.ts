/**
 * POST /api/evaluate
 *
 * This API route receives resume text (and optionally a job description) from
 * the frontend, sends it to the Gemini API for evaluation, and returns
 * structured feedback.
 *
 * This runs on the server (Next.js API Route), so the API key stays secret!
 */

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT, SYSTEM_PROMPT_WITH_JD } from "@/lib/prompt";
import type { EvaluationResult } from "@/lib/types";

export async function POST(request: NextRequest) {
  try {
    // 1. Parse the request body
    const body = await request.json();
    const { resumeText, jobDescription } = body as {
      resumeText: string;
      jobDescription?: string;
    };

    // 2. Validate input — make sure we got actual resume text
    if (!resumeText || typeof resumeText !== "string") {
      return NextResponse.json(
        { error: "Missing resumeText in request body." },
        { status: 400 }
      );
    }

    if (resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Resume text is too short. Please upload a valid resume." },
        { status: 400 }
      );
    }

    // 3. Check that the API key is configured
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ GEMINI_API_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Gemini API key not configured. Check your .env.local file." },
        { status: 500 }
      );
    }

    // 4. Initialize the Gemini client
    const ai = new GoogleGenAI({ apiKey });

    // 5. Pick the right prompt — use the JD-aware version if a job description is provided
    const hasJD = jobDescription && jobDescription.trim().length > 0;
    const systemPrompt = hasJD ? SYSTEM_PROMPT_WITH_JD : SYSTEM_PROMPT;

    // 6. Build the user message
    let userMessage = `Evaluate this resume:\n\n${resumeText}`;
    if (hasJD) {
      userMessage += `\n\n---\n\nEvaluate this resume for the following role:\n\n${jobDescription}`;
    }

    console.log(
      `🤖 Sending resume to Gemini for evaluation${hasJD ? " (with job description)" : ""}...`
    );

    // 7. Call the Gemini API with our system prompt and the resume text
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
      },
      contents: userMessage,
    });

    // 8. Extract the text from the response
    const responseText = response.text;
    if (!responseText) {
      throw new Error("Gemini returned an empty response.");
    }

    console.log("🤖 Received response from Gemini");

    // 9. Parse the JSON response
    const result: EvaluationResult = JSON.parse(responseText);

    // 10. Basic validation — make sure the response has the expected shape
    if (
      typeof result.overall_score !== "number" ||
      !result.summary ||
      !Array.isArray(result.strengths)
    ) {
      throw new Error("Gemini response doesn't match expected format.");
    }

    console.log("✅ Evaluation complete! Score:", result.overall_score);

    // 11. Return the evaluation result to the frontend
    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Evaluation failed:", error);

    // Handle specific error types
    const message =
      error instanceof SyntaxError
        ? "Failed to parse AI response. Please try again."
        : error instanceof Error
          ? error.message
          : "An unexpected error occurred.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
