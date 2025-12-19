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
        const {flashcardId} = req.params
        const {userId} = req.user
        const [user] = await db.select().from(user).where(eq(user.id,userId))
        const [collectionResult] = await db.select().from(collection).where(eq(collection.id,flashcard.collectionId))
        if(!collectionResult){
            return res.status(404).json({message: 'Collection of flashcard not found'})
        }
        if(collectionResult.createdBy!=userId && collectionResult.visibility==false && !user.isAdmin){
            return res.status(403).json({message: "You do not have the right to view this collection's flashcards"})
        }
        const [flashcardResult] = await db.select().from(flashcard).where(eq(flashcard.id,flashcardId))
        if(!flashcardResult){
            return res.status(404).json({message: 'Flashcard not found'})
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
        const {collectionId} = req.params
        const {userId} = req.user
        const [user] = await db.select().from(user).where(eq(user.id,userId))
        const [collectionResult] = await db.select().from(collection).where(eq(collection.id,collectionId))
        if(!collectionResult){
            return res.status(404).json({message: 'Collection of flashcard not found'})
        }
        if(collectionResult.createdBy!=userId && collectionResult.visibility==false && !user.isAdmin){
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
        let query = db.update(flashcard)
        if(front) {
            query = query.set({front:front})
        }
        if(back) {
            query = query.set({back:back})
        }
        if(urlFront) {
            query = query.set({urlFront:urlFront})
        }
        if(urlBack) {
            query = query.set({urlBack:urlBack})
        }
        query = query.where(eq(flashcard.id,id)).orderBy('created_at','desc')

        const [flashcardToUpdate] = await query
        if(!flashcardToUpdate){
            return res.status(404).json({message: 'Flashcard does not exist'})
        }
        const [collectionResult] = await db.select().from(collection).where(eq(collection.id,flashcardToUpdate.collectionId))
        if(!collectionResult){
            return res.status(404).json({message: 'Collection of flashcard not found'})
        }
        if(collectionResult.createdBy!=userId && collectionResult.visibility==false && !user.isAdmin){
            return res.status(403).json({message: "You do not have the right to view this collection's flashcards"})
        }
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
        const {flashcardId} = req.params
        const {userId} = req.user
        const [deletedFlashcard] = await db.delete(flashcard).where(eq(flashcard.id,flashcardId)).returning()
        if(!deletedFlashcard){
            return res.status(404).json({message: 'Flashcard does not exist'})
        }
        const [collectionResult] = await db.select().from(collection).where(eq(collection.id,deletedFlashcard.collectionId))
        if(!collectionResult){
            return res.status(404).json({message: 'Collection of flashcard not found'})
        }
        if(collectionResult.createdBy!=userId && collectionResult.visibility==false && !user.isAdmin){
            return res.status(403).json({message: "You do not have the right to view this collection's flashcards"})
        }
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


const getNextReview = (difficulty) => {
    switch (difficulty) {
        case 2 :
            return 2
            break;
        case 3 : 
            return 4
            break;
        case 4 : 
            return 8
            break;
        case 5 :
            return 16
            break;
        default :
            return 1
            break;
    }
}
