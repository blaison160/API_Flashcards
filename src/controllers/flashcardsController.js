import { db } from '../db/database.js'

import { collection, flashcard, review, user } from '../db/schema.js'
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

        const [newFlashcard] = await db.insert(flashcard).values({front,back,urlFront,urlBack,collectionId}).returning()

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
        const [flashcardUser] = await db.select().from(user).where(eq(user.id,userId))
        const [flashcardResult] = await db.select().from(flashcard).where(eq(flashcard.id,id))
        
        if(!flashcardResult){
            return res.status(404).json({message: 'Flashcard not found'})
        }

        const [collectionResult] = await db.select().from(collection).where(eq(collection.id,flashcardResult.collectionId))
        
        if(!collectionResult){
            return res.status(404).json({message: 'Collection of flashcard not found'})
        }
        if(collectionResult.createdBy!=userId && collectionResult.visibility==false && !flashcardUser.isAdmin){
            return res.status(403).json({message: "You do not have the right to view this collection's flashcards"})
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
export const getFlashcardByColletionId = async (req,res) => {
    try {
        const {id} = req.params
        const {userId} = req.user
        const [flashcardUser] = await db.select().from(user).where(eq(user.id,userId))
        const [collectionResult] = await db.select().from(collection).where(eq(collection.id,id))
        if(!collectionResult){
            return res.status(404).json({message: 'Collection of flashcard not found'})
        }
        if(collectionResult.createdBy!=userId && collectionResult.visibility==false && !flashcardUser.isAdmin){
            return res.status(403).json({message: "You do not have the right to view this collection's flashcards"})
        }
        const flashcardResult = await db.select().from(flashcard).where(eq(flashcard.collectionId,id))
        if(!flashcardResult){
            return res.status(404).json({message: 'Flashcards not found'})
        }
        res.status(200).json(flashcardResult)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to querry flashcards'})
    }
}


export const getFlashcardsToReview = async (req,res) => {
    try {
        const reviews = await db.select().from(review).where(lte(review.lastReview,calculateDate(review.level))).orderBy('created_at','desc')
        if(!result){
            return res.status(404).json({message: 'Collection not found'})
        }
        if(result.createdBy!=userId && result.visibility==false && !usr.isAdmin){
            return res.status(403).json({message: "You do not have the right to view this collection"})
        }
        res.status(200).json(result)
        
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
        const {id,} = req.params
        const {front,back,urlFront,urlBack} = req.body
        const {userId} = req.user
        const dataToUpdate = {}

        if (front !== undefined) dataToUpdate.front = front

        if (back !== undefined) dataToUpdate.back = back

        if (urlFront !== undefined) dataToUpdate.urlFront = urlFront

        if (urlBack !== undefined) dataToUpdate.urlBack = urlBack

        if (Object.keys(dataToUpdate).length == 0) {
            return res.status(400).json({ message: 'No data to update' })
        }
        
        const [flashcardToUpdate] = await db.select().from(flashcard).where(eq(flashcard.id, id))
       
        if(!flashcardToUpdate){
            return res.status(404).json({message: 'Flashcard does not exist'})
        }
        

        const [collectionResult] = await db.select().from(collection).where(and(eq(collection.id,flashcardToUpdate.collectionId),(eq(collection.createdBy,userId))))

        if(!collectionResult){
            return res.status(404).json({message: 'Collection of flashcard not found or you do not have the right to view this collections flashcards '})
        }

        const result = await db.update(flashcard).set(dataToUpdate).where(and(eq (flashcard.id, id)))

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
        const [deletedFlashcard] = await db.select().from(flashcard).where(eq(flashcard.id, id))
        
        if(!deletedFlashcard){
            return res.status(404).json({message: 'Flashcard does not exist'})
        }
        const [collectionResult] = await db.select().from(collection).where(and(eq(collection.id,deletedFlashcard.collectionId),eq(collection.createdBy,userId)))
        
        if(!collectionResult){
            return res.status(404).json({message: 'Collection of flashcard not found or you do not have the right to view this collections flashcards '})
        }

        db.delete(flashcard).where(eq(flashcard.id,id)).execute()

        res.status(200).json({message : `flashcard ${id} deleted`})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to delete flashcard'})
    } 
}


export const reviewFlashcard = async (req,res) => {
    try {
        const {flashcardId,level} = req.params
        const {userId} = req.user
        const [flashcardToReview] = await db.select().from(flashcard).where(eq(flashcard.id,flashcardId))
        if(!flashcardToReview){
            return res.status(404).json({message: 'Flashcard to review does not exist'})
        }
        if(!collectionResult){
            return res.status(404).json({message: 'Collection of flashcard not found'})
        }
        if(collectionResult.createdBy!=userId && collectionResult.visibility==false && !user.isAdmin){
            return res.status(403).json({message: "You do not have the right to view this collection's flashcards"})
        }
        let now = new Date()
        const [updatedReview] = await db.update(review).where(and(eq(review.flashcardId,flashcardId),eq(review.userId,userId))).set({level:level,lastReview:now})
        if(!updatedReview){
            [newReview] = await db.insert(review).values({userId:userId,flashcardId:flashcardId,level:level})
            if(!newReview){
                return res.status(404).json({message: 'Failed to create review'})
            }
        }
        res.status(200).json({message : `review ${updatedReview.id} updated`})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to update review'})
    } 
}


const getNextReview = (level) => {
    switch (level) {
        case 2 :
            return 2
        case 3 : 
            return 4
        case 4 : 
            return 8
        case 5 :
            return 16
        default :
            return 1
    }
}

const calculateDate = (level) => {
    var d = new Date()
    d.setDate(d.getDate()-getNextReview(level))
    return d
}