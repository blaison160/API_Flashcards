import { db } from '../db/database.js'
import { collection, user } from '../db/schema.js'
import { request, response } from 'express'
import { and, eq, like } from 'drizzle-orm'

/**
 * @param {request} req 
 * @param {response} res 
 */
export const deleteUser = async (req,res) => {
    try {
        const {id} = req.params
        const {userId} = req.user
        const [admin] = await db.select().from(user).where(and(eq(admin.id,userId),eq(admin.isAdmin,true)))
        if(!admin){
            return res.status(403).json({message: "You do not have the right to delete this user"})
        }
        const [deletedUser] = await db.delete(user).where(eq(user.id,id))
        if(!deletedUser){
            return res.status(404).json({message: 'Collection not found'})
        }
        await db.delete(collection).where(eq(collection.createdBy,id))
        res.status(200).json({message : `User ${id} deleted`})
    } catch (error) {
        console.error(error)
        res.status(500).json({error: 'Failed to delete question'})
    } 
}

/**
 * @param {request} req 
 * @param {response} res 
 */
export const getUserById = async (req,res) => {
    try {
        const {id} = req.params
        const [result] = await db.select().from(user).where(eq(user.id,id))
        if(!result){
            return res.status(404).json({message: 'User not found'})
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
export const getAllUsers = async (req,res) => {
    try {
        const results = await db.select().from(user).orderBy('created_at','desc')
        if(!results){
            return res.status(404).json({
                error:'No user found'
            })
        }
        res.status(200).json(results)
    } catch (error) {
        console.error(error)
        res.status(500).send({
            error:'Failed to querry users'
        })
    }
}