import { createNewProducts, deleteProduct, getAllProducts, getAllProductsById, updateProduct } from '../services/products.services.js'

// Listado de los productos
export const getProducts = async(req, res) => {
    try {
        const products = await getAllProducts()
        res.json(products);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los productos'});
    }
}

// busqueda de producto por id
export const getProductsById = async (req, res) =>{
    const productFound = await getAllProductsById(parseInt(req.params.id))
    if (!productFound) 
        return res.status(404).json({error: "Producto no encontrado"})
    
    return res.json(productFound)
}

//creacion de nuevo producto
export const createProducts = async (req, res) =>{
    const newProduct = await createNewProducts(req.body)
    res.json(newProduct)
} 

//eliminacion de productos
export const deleteProducts = async (req, res) =>{
    const productDelete = await deleteProduct(parseInt(req.params.id))
    if (!productDelete) 
        return res.status(404).json({error: "Producto no encontrado"})
    
    return res.json(productDelete)
}

//Actualizacion de productos
export const updateProducts = async(req,res) => {
    const productUpdate = await updateProduct(parseInt(req.params.id),req.body)
    return res.json(productUpdate)
}