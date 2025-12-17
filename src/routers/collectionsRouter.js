import { Router } from "express";
import { createCollection, deleteCollection, getCollectionById, getCollectionsByTitle, getMyCollections, updateCollection } from "../controllers/collectionsController.js";
import { collectionIdSchema, collectionTitleSchema, createCollectionSchema } from "../models/collections.js";
import { validateBody, validateParams } from "../middleware/validation.js";
import { authenticateToken } from "../middleware/authenticateToken.js";


const router = Router()

//router.use(authenticateToken)

router.get('/',getMyCollections)

router.get('/:id',validateParams(collectionIdSchema),getCollectionById)

router.get('/:title',validateParams(collectionTitleSchema),getCollectionsByTitle)

router.post('/',validateBody(createCollectionSchema),createCollection)

router.delete('/:id',validateParams(collectionIdSchema),deleteCollection)

router.patch('/:id',validateBody(createCollectionSchema),updateCollection)

export default router
