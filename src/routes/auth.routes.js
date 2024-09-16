import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controllers.js";

const router = Router()

// Ruta para registrar un usuario 
router.post('/register', registerUser)
// Ruta para iniciar sesion
router.post('/login',loginUser)

export default router;