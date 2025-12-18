import { db } from '../db/database.js'
import { collection, flashcard, user } from '../db/schema.js'
import { request, response } from 'express'
import { eq, and } from 'drizzle-orm'

/**
 * @param {request} req 
 * @param {response} res 
 */
export const createFlashcard = async (req,res) => {
    const {front, back, urlFront, urlBack, collectionId} = req.body
    const {userId} = req.user
    console.log(userId)

    try {
        const [result] = await db.select().from(collection).where(and(eq(collection.id,collectionId),eq(collection.createdBy,userId)))
        if(!result){
            return res.status(404).json({message: 'Collection of the flashcard not found'})
        }

        const [newFlashcard] = await db.insert(flashcard).values({front,back,urlFront,urlBack:collectionId}).returning()

        res.status(201).json({message: 'Flashcard created', data: newFlashcard})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to create flashcard'})
    }
}

/**
 * @param {request} req 
 * @param {response} res 
 */
export const getFlashcardById = async (req,res) => {
    try {
        const {id} = req.params
        const {userId} = req.user
        const [user] = await db.select().from(user).where(eq(user.id,userId))
        const [flashcardResult] = await db.select().from(flashcard).where(eq(flashcard.id,id))
        const [collectionResult] = await db.select().from(collection).where(eq(collection.id,flashcard.collectionId))
        if(!flashcardResult){
            return res.status(404).json({message: 'Flashcard not found'})
        }
        if(collectionResult.createdBy!=userId && collectionResult.visibility==false && !user.isAdmin){
            return res.status(403).json({message: "You do not have the right to view this flashcard"})
        }
        res.status(200).json(flashcardResult)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to querry flashcard'})
    }
}

/**
 * @param {request} req 
 * @param {response} res 
 */
export const getFlashcardByColletion = async (req,res) => {
    try {
        const {id} = req.params
        const {userId} = req.user
        const [user] = await db.select().from(user).where(eq(user.id,userId))
        const [flashcardResult] = await db.select().from(flashcard).where(eq(flashcard.collectionId,id))
        const [collectionResult] = await db.select().from(collection).where(eq(collection.id,id))
        if(!collectionResult){
            return res.status(404).json({message: 'Collection not found'})
        }
        if(collectionResult.createdBy!=userId && collectionResult.visibility==false && !user.isAdmin){
            return res.status(403).json({message: "You do not have the right to view this collection"})
        }
        res.status(200).json(flashcardResult)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to querry flashcards'})
    }
}

/**
 * @param {request} req 
 * @param {response} res 
 */
export const updateFlashcard = async (req,res) => {
    try {
        const {id,front,back,urlFront,urlBack} = req.params
        const {userId} = req.user
        //check if flashcard exist and get collection.id
        const [flashcardResult] = await db.select().from(flashcard).where(eq(flashcard.id,id))
        if(!flashcardResult){
            return res.status(404).json({message: 'Flashcard to update does not exist'})
        }
        //check if the user is the owner of the flashcard's collection
        const [collectionResult] = await db.select().from(collection).where(and(eq(collection.id,flashcard.collectionId),eq(collection.createdBy,userId)))
        if(!collectionResult){
            return res.status(403).json({message: 'You are not the owner of the flashcard'})
        }
        //update the flashcard
        const result = await db.update(flashcard).set({front: front, back: back, urlFront:urlFront, urlBack:urlBack}).where(eq(flashcard.id,id))
        res.status(200).json({message : `Flashcard ${id} updated`})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to querry flashcard'})
    }
}

/**
 * @param {request} req 
 * @param {response} res 
 */
export const deleteFlashcard = async (req,res) => {
    try {
        const {id} = req.params
        const {userId} = req.user

        //check if flashcard exist and get collection.id
        const [flashcardResult] = await db.select().from(flashcard).where(eq(flashcard.id,id))
        
        if(!flashcardResult){
            return res.status(404).json({message: 'Flashcard to delete does not exist'})
        }

        //check if the user is the owner of the flashcard's collection
        const [collectionResult] = await db.select().from(collection).where(and(eq(collection.id,flashcard.collectionId),eq(collection.createdBy,userId)))
        if(!collectionResult){
            return res.status(403).json({message: 'You are not the owner of the flashcard'})
        }

        const [deletedFlashcard] = await db.delete(flashcard).where(eq(flashcard.id,id)).returning()
        res.status(200).json({message : `flashcard ${id} deleted`})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to delete flashcard'})
    } 
}



