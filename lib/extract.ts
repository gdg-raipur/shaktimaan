/**
 * Text extraction utilities for PDF and DOCX files.
 *
 * We use two libraries:
 * - pdfjs-dist: Mozilla's PDF parser (same engine as Firefox's PDF viewer)
 * - mammoth: Converts DOCX to plain text
 *
 * Both run entirely in the browser — no server needed for this step!
 */

import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";

// Configure the PDF.js worker — it runs parsing in a Web Worker so the UI stays responsive.
// We load the worker from a CDN to avoid bundling issues with Next.js.
const PDFJS_VERSION = pdfjsLib.version;
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.mjs`;

/**
 * Extract text from a PDF file using pdfjs-dist.
 * Reads every page and concatenates the text content.
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  console.log("📖 Extracting text from PDF:", file.name);

  // Convert the File to an ArrayBuffer that pdfjs can read
  const arrayBuffer = await file.arrayBuffer();

  // Load the PDF document
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  console.log(`📖 PDF has ${pdf.numPages} page(s)`);

  // Extract text from each page
  const pageTexts: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const textContent = await page.getTextContent();
    // Each item has a "str" property with the text
    const pageText = textContent.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    pageTexts.push(pageText);
  }

  const fullText = pageTexts.join("\n\n");

  if (!fullText.trim()) {
    throw new Error("The PDF appears to be empty or contains only images.");
  }

  console.log(`📖 Extracted ${fullText.length} characters from PDF`);
  return fullText;
}

/**
 * Extract text from a DOCX file using mammoth.
 * Mammoth converts Word documents to plain text.
 */
export async function extractTextFromDOCX(file: File): Promise<string> {
  console.log("📖 Extracting text from DOCX:", file.name);

  // Convert the File to an ArrayBuffer that mammoth can read
  const arrayBuffer = await file.arrayBuffer();

  // Extract raw text (we don't need HTML formatting)
  const result = await mammoth.extractRawText({ arrayBuffer });
  const text = result.value;

  if (!text.trim()) {
    throw new Error("The DOCX file appears to be empty.");
  }

  console.log(`📖 Extracted ${text.length} characters from DOCX`);
  return text;
}

/**
 * Dispatcher — picks the right extractor based on file extension.
 * This is the main function you should call from the UI.
 */
export async function extractText(file: File): Promise<string> {
  const name = file.name.toLowerCase();

  if (name.endsWith(".pdf")) {
    return extractTextFromPDF(file);
  } else if (name.endsWith(".docx")) {
    return extractTextFromDOCX(file);
  } else {
    throw new Error(`Unsupported file type: ${name}. Please upload a PDF or DOCX file.`);
  }
}
