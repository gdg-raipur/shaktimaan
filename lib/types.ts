/**
 * TypeScript types for the resume evaluation result.
 *
 * This interface defines the exact shape of the JSON that Gemini returns.
 * Both the API route and the frontend components use this type.
 */

export interface EvaluationResult {
  /** Overall resume score from 0-100 */
  overall_score: number;
  /** 2-3 sentence overview of the resume quality */
  summary: string;
  /** 3-5 specific positive aspects of the resume */
  strengths: string[];
  /** 3-5 specific issues or gaps in the resume */
  weaknesses: string[];
  /** 3-5 actionable improvement suggestions */
  suggestions: string[];
  /** Breakdown scores by resume section */
  section_scores: {
    experience: number;
    skills: number;
    education: number;
    formatting: number;
    impact: number;
  };
  /** AI-improved version of the weakest bullet point (optional) */
  rewritten_bullet?: string;
  /** Relevance score for a specific job role (stretch feature) */
  role_fit_score?: number;
  /** Role-specific improvement suggestions (stretch feature) */
  tailored_suggestions?: string[];
}
