import { NextRequest, NextResponse } from 'next/server';
import { parseResumeWithOllama } from '@/lib/ollama';
import { PortfolioSchema } from '@/lib/portfolio-schema';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const resumeText = formData.get('text') as string;

    if (!resumeText || resumeText.length < 50) {
      return NextResponse.json(
        { error: 'Resume text is required (min 50 chars)' },
        { status: 400 }
      );
    }

    const raw = await parseResumeWithOllama(resumeText);
    const validated = PortfolioSchema.parse(raw);

    return NextResponse.json({ portfolio: validated });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Parse failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
