import { z } from 'zod'

export const flashcardIdSchema = z.object({
    id: z.uuid(),
})
export const flashcardlevelSchema = z.object({
    level: z.int().min(1,'minimum level must be 1').max(5, 'maximum level must be 5'),
})
export const createFlashcardSchema = z.object({
    front : z.string().min(3,'front text must be at least 3 character long').max(255,'front text must be at most 255 character long'),
    back : z.string().min(3,'back text must be at least 3 character long').max(255,'back text must be at most 255 character long'),
    urlFront : z.string().min(3,'front url must be at least 3 character long').max(255,'front url must be at most 255 character long'),
    urlBack : z.string().min(3,'back url must be at least 3 character long').max(255,'back url must be at most 255 character long'),
    collectionID : z.uuid,
})