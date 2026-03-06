// TODO: Implement the POST endpoint for resume evaluation (checkpoint-3)
// - Accept { resumeText: string } in the request body
// - Validate input
// - Call Gemini API
// - Parse and return JSON response

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Not implemented yet — coming in checkpoint-3!" },
    { status: 501 }
  );
}
