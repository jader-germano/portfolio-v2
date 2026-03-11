const OLLAMA_BASE_URL =
  process.env.OLLAMA_URL || 'http://187.77.227.151:11434';

export interface PortfolioData {
  name: string;
  title: string;
  summary: string;
  experiences: {
    company: string;
    role: string;
    years: string;
    tech: string[];
  }[];
  skills: string[];
  projects: {
    name: string;
    description: string;
    tech: string[];
  }[];
}

export async function parseResumeWithOllama(
  resumeText: string
): Promise<PortfolioData> {
  const prompt = `Extract the following resume into a JSON object. Return ONLY valid JSON, no markdown, no explanation.

JSON schema: { "name": string, "title": string, "summary": string, "experiences": [{"company": string, "role": string, "years": string, "tech": string[]}], "skills": string[], "projects": [{"name": string, "description": string, "tech": string[]}] }

Resume:
${resumeText}`;

  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'deepseek-r1:7b',
      prompt,
      stream: false,
      format: 'json',
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return JSON.parse(data.response) as PortfolioData;
}
