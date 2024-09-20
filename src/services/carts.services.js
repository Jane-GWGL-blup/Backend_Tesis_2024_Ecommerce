import {prisma} from '../db/index.js'

//obtener el carrito de un usuario

export const getUserCart = async (userId) =>{
    if (!userId) {
        throw new Error('El userId no esta definido')
    }
    const cart = await prisma.cart.findUnique({
        where: {userId},
        include: {items: {include: { product: true}}}// Incluir los productos en los ítems del carrito
    })

    if (!cart) {
        throw new Error('Carrito de compras no encontrado para este usuario')
    }

    return cart
}

//agregar un producto al carrito 
export const addItemToCart = async ( userId,productId,quantity) =>{
    //Verificar si el producto existe en la tabla product
    const product = await prisma.product.findUnique({
        where:{id: productId}
    })
    if (!product) {
        throw new Error('Producto no encontrado');  // Si el producto no existe, devolvemos un error
    }

    //verificar si el usuario ya tiene un carrito
    let cart = await prisma.cart.findUnique({
        where:{userId}
    })
    if (!cart) {
        //crear un carrito nuevo si no existe
        cart = await prisma.cart.create({
            data: {
                user:{
                    connect:{id: userId} //conectamos el carrito con el usuario usando Id
                }
            }
        })
    }

    // verificar si el producto ya esta en el carrito
    const existingItem = await prisma.cartItem.findFirst({
        where:{cartId: cart.id, productId}
    })

    if (existingItem) {
        //Actualizar la cantidad si ya existe en el carrito 
        return prisma.cartItem.update({
            where:{id: existingItem.id},
            data:{quantity: existingItem.quantity + quantity}
        });
    }else{
        //Agregar el nuevo item al carrito 
        return prisma.cartItem.create({
            data: {cartId:cart.id,
                productId,
                quantity
            }
        })
    }
};

//Actualizar la cantidad de un item en el carrito
export const updateCartItemQuantity = async(userId,productId,quantity) =>{
    const cart = await prisma.cart.findUnique({
        where: {userId}
    })
    if (!cart) {
        throw new Error('carrito no encontrado para este usuario')
    }

    //actulizar la cantidad del item
    return prisma.cartItem.updateMany({
        where:{cartId: cart.id, productId},
        data: {quantity}
    });
};

//eliminar un item dewl carrito 
export const removeItemFromCart = async (userId,productId) => {
    const cart = await prisma.cart.findUnique({
        where: {userId}
    });
    if (!cart) {
        throw new Error('carrito no encontrado para este usuario')
    }
    return prisma.cartItem.deleteMany({
        where:{cartId: cart.id,productId}
    })
}

// Vaciar el carrito despues de crear una orden
export const clearCart = async(userId) =>{
    const cart = await prisma.cart.findUnique({
        where:{userId}
    })

    if (!cart) {
        throw new Error('Carrito no encontrado para este usuario')
    }

    return prisma.cartItem.deleteMany({
        where:{cartId: cart.id}
    })
}