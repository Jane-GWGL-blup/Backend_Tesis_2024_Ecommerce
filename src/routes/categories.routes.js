import { Router } from "express";
import {prisma} from '../db/index.js'
import { getCategories, createCategories, getCategoriesById, deleteCategories, updateCategories } from "../controllers/categories.controllers.js";

const router = Router();

// Listado de categorias 
router.get('/categories', getCategories)
// Creacion de categorias
router.post('/categories', createCategories);
// Busqueda por id
router.get('/categories/:id', getCategoriesById)
// Eliminacion de categorias 
router.delete('/categories/:id', deleteCategories)
// Actualizacion de categoria
router.put('/categories/:id', updateCategories)

export default router;