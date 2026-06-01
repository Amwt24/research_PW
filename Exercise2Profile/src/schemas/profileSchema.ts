import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(200, 'Bio must not exceed 200 characters').optional(),
});

export type ProfileData = z.infer<typeof profileSchema>;
