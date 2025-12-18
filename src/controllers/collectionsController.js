import { db } from '../db/database.js'
import { collection, user } from '../db/schema.js'
import { request, response } from 'express'
import { and, eq, like } from 'drizzle-orm'

/**
 * @param {request} req 
 * @param {response} res 
 */
export const createCollection = async (req,res) => {
    const {title, description, visibility} = req.body
    const {userId} = req.user
    console.log(userId)

    try {
        const [newCollection] = await db.insert(collection).values({title,description,visibility,createdBy:userId}).returning()
        res.status(201).json({message: 'Collection created', data: newCollection})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to create collection'})
    }
}

/**
 * @param {request} req 
 * @param {response} res 
 */
export const deleteCollection = async (req,res) => {
    try {
        const {id} = req.params
        const {userId} = req.user
        const [deletedCollection] = await db.delete(collection).where(eq(collection.id,id))
        if(!deletedCollection){
            return res.status(404).json({message: 'Collection not found'})
        }
        if(deletedCollection.createdBy!=userId){
            return res.status(403).json({message: "You do not have the right to delete this collection"})
        }
        res.status(200).json({message : `Collection ${id} deleted`})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to delete question'})
    } 
}

/**
 * @param {request} req 
 * @param {response} res 
 */
export const getMyCollections = async (req,res) => {
    try {
        const {userId} = req.user
        const results = await db.select().from(collection).where(eq(collection.createdBy,userId)).orderBy('created_at','desc')
        res.status(200).json(results)
    } catch (error) {
        console.error(error)
        res.status(500).send({
            error:'Failed to querry your collections'
        })
    }
}


/**
 * @param {request} req 
 * @param {response} res 
 */
export const getCollectionById = async (req,res) => {
    try {
        const {id} = req.params
        const {userId} = req.user
        const usr = await db.select().from(user).where(eq(user.id,userId))
        const result = await db.select().from(collection).where(eq(collection.id,id)).orderBy('created_at','desc')
        if(!result){
            return res.status(404).json({message: 'Collection not found'})
        }
        if(result.createdBy!=userId && result.visibility==false && !usr.isAdmin){
            return res.status(403).json({message: "You do not have the right to view this collection"})
        }
        res.status(200).json(result)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to querry collection'})
    }
}

/**
 * @param {request} req 
 * @param {response} res 
 */
export const getCollectionsByTitle = async (req,res) => {
    try {
        const {title} = req.body
        let query = db.select().from(collection)
        if(title) {
            query = query.where(and(eq(collection.visibility,true),like(collection.title,`%${title}%`)))
        }
        query = query.orderBy('created_at','desc')
        const results = await query
        if(!results){
            return res.status(404).json({message: 'No result matching querry'})
        }
        res.status(200).json(results)
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to querry collections'})
    }
}

/**
 * @param {request} req 
 * @param {response} res 
 */
export const updateCollection = async (req,res) => {
    try {
        const {id,title,description,visibility} = req.params
        const {userId} = req.user
        const result = await db.update(collection).set({title: title, description: description,visibility:visibility}).where(and(eq(collection.id,id)),(eq(collection.createdBy,userId)))
        if(!result){
            return res.status(404).json({message: 'Collection to update does not exist'})
        }
        res.status(200).json({message : `Collection ${id} updated`})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to querry collections'})
    }
}

