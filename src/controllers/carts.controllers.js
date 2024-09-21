import * as cartService from '../services/carts.services.js'

//Obtener el carrito de un usuario
export const getCart = async(req,res) =>{
    try {
        const cart = await cartService.getUserCart(req.user.id) // req.userId viene del middleware de autenticación
        res.json(cart)
    } catch (error) {
        console.error("Error al obtener el carrito",error)
        res.status(500).json({message: error.message})
    }
}

// agregar un producto al carrito
export const addItemToCart = async (req,res) =>{
    const {productId, quantity} = req.body
    try {
        const cartItem = await cartService.addItemToCart(req.user.id,productId,quantity);
        res.status(201).json(cartItem)
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        res.status(500).json({message:error.message})
    }
}

// Actualizar la cantiodad de un item en el carrito
export const updateCartItemQuantity =async (req,res) =>{
    const {productId,quantity} = req.body;
    try {
        const updateCartItem = await cartService.updateCartItemQuantity(req.user.id,productId,quantity);
        res.json(updateCartItem)
    } catch (error) {
        res.status(500).json({message: error.message })
    }
}
// Eliminar un item del carrito
export const removeItemFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        const deletedItem = await cartService.removeItemFromCart(req.user.id, productId);
        res.json(deletedItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Vaciar el carrito
export const clearCart = async (req, res) => {
    try {
         await cartService.clearCart(req.user.id);
        res.json({ message: 'Carrito vaciado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};