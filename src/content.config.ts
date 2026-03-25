import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/chapters' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    chapter: z.number(),
    block: z.enum(['prefacio', 'raciocinio', 'visual', 'exercicios', 'apendice']),
    estimatedTime: z.string(),
    difficulty: z.enum(['fundamento', 'intermediário', 'avançado']),
    tags: z.array(z.string()),
    prerequisites: z.array(z.number()).optional(),
    objectives: z.array(z.string()),
  }),
});

const exercises = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/exercises' }),
  schema: z.object({
    title: z.string(),
    chapter: z.number(),
    exerciseNumber: z.number(),
    scenario: z.string(),
    timeLimit: z.number(),
    difficulty: z.enum(['fundamento', 'intermediário', 'avançado']),
    tags: z.array(z.string()),
    phases: z.array(z.string()),
  }),
});

export const collections = { chapters, exercises };
