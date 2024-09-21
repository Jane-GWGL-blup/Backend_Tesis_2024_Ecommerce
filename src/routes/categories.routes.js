import { Router } from "express";
import {authenticateToken,authorizeRoles} from '../middlewares/auth.middleware.js'
import { getCategories, createCategories, getCategoriesById, deleteCategories, updateCategories } from "../controllers/categories.controllers.js";

const router = Router();
//Ruta publica
// Listado de categorias 
router.get('/categories', getCategories)

//ruta solo para admins
// Creacion de categorias
router.post('/categories', authenticateToken, authorizeRoles(['ADMIN']), createCategories);
// Busqueda por id
router.get('/categories/:id', authenticateToken, authorizeRoles(['ADMIN']), getCategoriesById)
// Eliminacion de categorias 
router.delete('/categories/:id', authenticateToken, authorizeRoles(['ADMIN']), deleteCategories)
// Actualizacion de categoria
router.put('/categories/:id', authenticateToken, authorizeRoles(['ADMIN']), updateCategories)

export default router;