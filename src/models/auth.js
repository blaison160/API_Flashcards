import { email, z } from 'zod'

export const registerSchema = z.object({
    email: z.email(),
    lastName: z.string().min(3,'Last name must be at least 3 characters.').max(30,'Last name must be at most 30 characters.'),
    name: z.string().min(3,'Name must be at least 3 characters.').max(30,'Name must be at most 30 characters.'),
    password: z.string().min(8,' Password must be at least 8 characters').max(255, 'Password must be at most 255 characters.'),

})

export const userIdDschema = z.object({
    id: z.uuid(),
})

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(8).max(255),
})