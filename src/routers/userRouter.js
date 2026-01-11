import { Router } from "express";
import { getAllUsers,getUserById,deleteUser } from "../controllers/userController.js";
import { validateParams } from "../middleware/validation.js";
import {userIdDschema } from "../models/auth.js";

const router = Router()

router.get('/',getAllUsers)

router.get('/:id',validateParams(userIdDschema),getUserById)

router.delete('/:id',validateParams(userIdDschema),deleteUser)

export default router