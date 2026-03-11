import { z } from 'zod';

export const ExperienceSchema = z.object({
  company: z.string(),
  role: z.string(),
  years: z.string(),
  tech: z.array(z.string()),
});

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string(),
  tech: z.array(z.string()),
});

export const PortfolioSchema = z.object({
  name: z.string().min(2),
  title: z.string().min(2),
  summary: z.string().min(10),
  experiences: z.array(ExperienceSchema),
  skills: z.array(z.string()),
  projects: z.array(ProjectSchema),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;
