import { Router } from "express";
import { deleteFlashcard,getFlashcardById,getFlashcardByColletionId,getFlashcardsToReview,updateFlashcard,reviewFlashcard,createFlashcard } from "../controllers/flashcardsController.js";
import { flashcardIdSchema, flashcardlevelSchema, createFlashcardSchema, updateFlascardSchema } from "../models/flashcards.js";
import { collectionIdSchema } from "../models/collections.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

const router = Router()

router.use(authenticateToken)

router.delete('/:id',validateParams(flashcardIdSchema),deleteFlashcard)

router.get('/:id',validateParams(flashcardIdSchema),getFlashcardById)

router.get('/collection/:id',validateParams(collectionIdSchema),getFlashcardByColletionId)

router.get('/review/',getFlashcardsToReview)

router.patch('/:id',validateBody(updateFlascardSchema),updateFlashcard)

router.patch('/review/:id',validateBody(flashcardlevelSchema),reviewFlashcard)

router.post('/',validateBody(createFlashcardSchema),createFlashcard)

export default router