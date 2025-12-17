import { z } from 'zod'

export const createCollectionSchema = z.object({
    title: z.string().min(1,'Title must be at least 1 characters.').max(30, 'Title must be at most 30 characters.'),
    description: z.string().min(1,'Description must be at least 1 characters.').max(255, 'Description must be at most 255 characters.'),
    visibility: z.boolean(),
})

export const collectionIdDschema = z.object({
    id: z.uuid(),
})

export const collectionTitleSchema = z.object({
    title: z.string().min(1,'Title must be at least 1 characters.').max(30, 'Title must be at most 30 characters.'),
})