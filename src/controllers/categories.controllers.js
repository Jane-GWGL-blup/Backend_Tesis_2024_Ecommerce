import { getAllCategories,createNewCategories,getAllCategoriesById,deleteCategory,updateCategory } from '../services/categories.services.js';

// Listado de categorias
export const getCategories = async(req, res) =>{
    try {
        const categories = await getAllCategories()
        res.json(categories)
    } catch (error) {
        res.status(500).json({error: 'Error al obtener las categorias'});
    }
    
}

// Creacion de categoria
export const createCategories = async( req,res) =>{
    try {
        const newCategory = await createNewCategories(req.body);
        res.status(201).json(newCategory)
    } catch (error) {
        res.status(500).json({error: 'Error al crear la categoria'});
    }
}

// Busqueda por ID
export const getCategoriesById = async (req,res) =>{
    try {
        const categoryFound = await getAllCategoriesById(parseInt(req.params.id))
    if(!categoryFound){
        return res.status(404).json({error: "Categoria no encontrada"})
    }
    res.json(categoryFound)
        
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
}

// Eliminacion de categoria
export const deleteCategories = async(req, res)=>{
    try {
        const categoryDelete = await deleteCategory(parseInt(req.params.id))
        res.json(categoryDelete)
    } catch (error) {
        res.status(500).json({error: 'error al eliminar la categoria'})
    }
}

// Actualizacion 
export const updateCategories = async(req, res) =>{
    try {
        const categoryUpdate = await updateCategory(parseInt(req.params.id), req.body)
        res.json(categoryUpdate)
    } catch (error) {
        res.status(500).json({error: ' Error al actualizar la categori'})
    }
}