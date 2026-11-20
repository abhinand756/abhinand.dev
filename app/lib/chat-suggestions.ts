/**
 * JARVIS — suggestion engine (client-safe).
 *
 * Contains NO private data and no knowledge-base import, so it can be bundled
 * into the browser without shipping the system prompt or server logic.
 *
 * `getContextualSuggestions` inspects the assistant's latest answer and
 * returns genuinely relevant follow-up questions. Every suggestion is a real
 * question that JARVIS can answer from the knowledge base.
 */

/** Questions shown on the welcome screen. */
export const WELCOME_QUESTIONS = [
  "Who is Abhinand?",
  "What are his technical skills?",
  "Tell me about his experience.",
  "What projects has he built?",
  "What technologies does he specialize in?",
  "What makes him different?",
  "How can I contact him?",
  "Why I should hire him?",
] as const;

const DEFAULT_FOLLOW_UPS = [
  "What projects has he built?",
  "What are his technical skills?",
  "Tell me about his experience.",
];

interface SuggestionRule {
  /** Words in the assistant answer (or the question) that trigger this rule. */
  match: RegExp;
  suggestions: string[];
}

const RULES: SuggestionRule[] = [
  {
    match: /\breact native\b|\bflutter\b|\bmobile (app|application|development)\b|\bapp projects?\b/i,
    suggestions: [
      "Tell me about his mobile development experience.",
      "Which mobile technologies does he use?",
      "What projects has he built?",
    ],
  },
  {
    match: /\breact\b(?! native)/i,
    suggestions: [
      "Show projects using React.",
      "Tell me about his Next.js experience.",
      "What are his technical skills?",
    ],
  },
  {
    match: /\bnext\.?js\b/i,
    suggestions: [
      "Which projects use Next.js?",
      "Tell me about his experience at Coddle Technologies.",
      "What technologies does he specialize in?",
    ],
  },
  {
    match: /\b(happymart|e-?commerce)\b/i,
    suggestions: [
      "What features does HappyMart have?",
      "What technologies power HappyMart?",
      "Tell me about Cineholic.",
    ],
  },
  {
    match: /\b(cineholic|movie|tmdb)\b/i,
    suggestions: [
      "What is Cineholic built with?",
      "Tell me about HappyMart.",
      "What projects has he built?",
    ],
  },
  {
    match: /\b(chat application|socket\.?io|real-?time)\b/i,
    suggestions: [
      "How does his chat application work?",
      "What backend technologies does he use?",
      "What projects has he built?",
    ],
  },
  {
    match: /\b(mathrubhumi|grihalakshmi|edgeprop|featured projects?|company projects?)\b/i,
    suggestions: [
      "Tell me about his work at Coddle Technologies.",
      "What are his professional responsibilities?",
      "How can I contact him?",
    ],
  },
  {
    match: /\b(experience|worked|company|coddle|career|professional)\b/i,
    suggestions: [
      "What are his key responsibilities?",
      "Which featured projects has he worked on?",
      "Is he available for freelance work?",
    ],
  },
  {
    match: /\b(skills?|technolog|tech stack|stack|tools?)\b/i,
    suggestions: [
      "Show projects using React.",
      "Tell me about his Next.js experience.",
      "What is he currently learning?",
    ],
  },
  {
    match: /\b(project|portfolio|built|build)\b/i,
    suggestions: [
      "Tell me about HappyMart.",
      "Tell me about Cineholic.",
      "What technologies does he specialize in?",
    ],
  },
  {
    match: /\b(contact|email|phone|hire|reach|linkedin|github|social)\b/i,
    suggestions: [
      "Is he available for freelance work?",
      "Where is he located?",
      "What is his professional background?",
    ],
  },
  {
    match: /\b(education|college|degree|btech|stud(y|ied)|university|school)\b/i,
    suggestions: [
      "What is his professional experience?",
      "What are his technical skills?",
      "Tell me about his hobbies and interests.",
    ],
  },
  {
    match: /\b(certificat|achievement|award|coursera|freecodecamp|aws)\b/i,
    suggestions: [
      "What are his technical skills?",
      "Tell me about his education.",
      "What projects has he built?",
    ],
  },
  {
    match: /\b(hobb|interest|cinema|movie|anime|cricket|football|travel|photograph|game|music|favourite|favorite)\b/i,
    suggestions: [
      "What are his favourite movies?",
      "Tell me about his education.",
      "What makes him different?",
    ],
  },
  {
    match: /\b(learn|learning|currently|full-?stack|mern)\b/i,
    suggestions: [
      "What backend technologies does he use?",
      "What are his technical skills?",
      "What projects has he built?",
    ],
  },
  {
    match: /\b(different|unique|stand out|strength|why hire)\b/i,
    suggestions: [
      "What projects has he built?",
      "Tell me about his experience.",
      "How can I contact him?",
    ],
  },
];

/**
 * Returns up to 3 follow-up questions based on the assistant's latest answer.
 * Falls back to sensible defaults so the UI never renders an empty state.
 */
export function getContextualSuggestions(
  assistantText: string,
  visitorText = "",
  limit = 3
): string[] {
  const haystack = `${assistantText}\n${visitorText}`;
  const seen = new Set<string>();
  const results: string[] = [];

  // Prefer rules that match the assistant's answer, then fall back to the
  // visitor's question so follow-ups stay on topic.
  for (const source of [assistantText, visitorText]) {
    if (results.length >= limit) break;
    for (const rule of RULES) {
      if (results.length >= limit) break;
      if (!rule.match.test(source)) continue;
      for (const suggestion of rule.suggestions) {
        if (results.length >= limit) break;
        const key = suggestion.toLowerCase();
        if (seen.has(key)) continue;
        // Don't suggest repeating the exact question that was just asked.
        if (
          visitorText &&
          suggestion.toLowerCase().replace(/[.!?]/g, "") ===
            visitorText.toLowerCase().trim().replace(/[.!?]/g, "")
        ) {
          continue;
        }
        seen.add(key);
        results.push(suggestion);
      }
    }
  }

  for (const fallback of DEFAULT_FOLLOW_UPS) {
    if (results.length >= limit) break;
    const key = fallback.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    results.push(fallback);
  }

  return results.slice(0, limit);
}
