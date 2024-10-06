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
        if (!req.body.name || !req.body.description) {
            return res.status(400).json({error:'El nombre y la descripcion son obligatorios'})
        }
        const newCategory = await createNewCategories(req.body);
        res.status(201).json(newCategory)
    } catch (error) {
        console.error('Error al crear la categoría:', error);
        res.status(500).json({ error: 'Error al crear la categoría. Por favor, intente nuevamente.' });
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
        const {name,description} = req.body
        if (!name || !description) {
            return res.status(400).json({error: 'El nombre y la descripcion son obligatorias'})
        }
        const categoryUpdate = await updateCategory(parseInt(req.params.id),{name,description})
        if (!categoryUpdate) {
            return res.status(404).json({ error: 'Categoría no encontrada para actualizar.' });
        }
        res.json(categoryUpdate)
    } catch (error) {
        console.error('Error al actualizar la categoría:', error);
        res.status(500).json({ error: 'Error al actualizar la categoría. Por favor, intente nuevamente.' });
    }
}