import { z } from 'zod';

export const registerBodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  login: z.string().trim().min(3).max(100),
  password: z.string().min(6).max(72),
});

export const loginBodySchema = z.object({
  login: z.string().trim().min(3).max(100),
  password: z.string().min(6).max(72),
});

export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;