import { Router } from "express";
import { createCollection, deleteCollection, getCollectionById, getCollectionsByTitle, getMyCollections, updateCollection } from "../controllers/collectionsController";







const router = Router()

//router.use(authenticateToken)

router.get('/',getMyCollections)

router.get('/:id',getCollectionById)

router.get('/:title',getCollectionsByTitle)

router.post('/',createCollection)

router.delete('/:id',deleteCollection)

router.patch('/:id',updateCollection)

export default router
