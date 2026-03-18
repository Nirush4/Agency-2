import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  avatar_url: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default schema;
