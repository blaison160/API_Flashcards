import { request, response } from "express";
import bcrypt from "bcrypt";
import { db } from "../db/database.js";
import { user } from "../db/schema.js";
import jwt from "jsonwebtoken";
import "dotenv/config"
import { eq } from "drizzle-orm";

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
export const register = async (req,res) => {
    try{
        const { email,lastName,name,password} = req.body;

        const hashedPassword = await bcrypt.hash(password,12)

       const [newUser]= await db.insert(user).values({
            email,
            lastName,
            name,
            password: hashedPassword,
        }).returning({
            email: user.email,
            lastName: user.lastName,
            name: user.name,
            id: user.id
        })

        const token = jwt.sign({userId: newUser.id}, process.env.JWT_SECRET,{expiresIn:'24h'})
        
        res.status(201).json({
            message: 'User created',
            userData: newUser,
            token,
        })
    }catch( error){
        console.error(error)
        res.status(500).json({
            error: 'Register failed',
        })
    }

}

export const login = async (req,res) => {
    try {
        const { email,password} = req.body;
        const [usr] = await db.select().from(user).where(eq(user.email,email))
        if(!usr){
            return res.status(401).json({
                error: "Invalid email or password"
            })
        }
        const isValidPassword = await bcrypt.compare(password,usr.password)
        if(!isValidPassword){
            return res.status(401).json({
                error: "Invalid email or password"
            })
        }
        
        const token = jwt.sign({userId: usr.id}, process.env.JWT_SECRET,{expiresIn:'24h'})

        res.status(200).json({
            message: 'Login succsessful',
            userData: {
                email: user.email,
                username: user.username,
                id: user.id
            },
            token
        })
        

    } catch (error) {
        console.error(error)
        res.status(500).json({
            error: 'Login failed',
        })
    }
}

/**
 * Admin functions (bonus points) :
 * export const getAllUsers = async(req,res) => {}
 * export const getUserById = async(req,res) => {}
 * export const deleteUser = async(req,res) => {}
 */