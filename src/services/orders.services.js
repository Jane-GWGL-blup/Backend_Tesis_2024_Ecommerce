import {
    prisma
} from '../db/index.js';



// Listado
export const getAllOrders = () => {
    return prisma.order.findMany({
        include: {
            items: true,
            user: true
        } // con esto incluimos los datos del usuario logeado
    });
}


// Busqueda por Id
export const getAllOrdersById = async (id) => {
    return prisma.order.findFirst({
        where: {
            id
        },
        include: {
            items: {
                include: {
                    product: true // Incluir los detalles del producto en cada item de la orden
                }
            },
            user: true, // Incluir los detalles del usuario
        },
    });
};

// Elimicación
export const deleteOrder = (id) => {
    return prisma.order.delete({
        where: {
            id
        }
    })
}

// Actualizacion 
export const updateOrder = (id, data) => {
    return prisma.order.update({
        where: {
            id
        },
        data
    })
}

// Calcular total 
export const calcularTotalAmount = async (orderId) => {
    try {
        //Obtener todos los OrderItems de una Orden
        const orderItems = await prisma.orderItem.findMany({
            where: {
                orderId
            }
        })
        // si no hay OrderItems, el total es 0
        if (!orderItems || orderItems.length === 0) {
            return await prisma.order.update({
                where: {
                    id: orderId
                },
                data: {
                    totalAmount: 0
                },
            })
        }

        // Calcular el total sumando el precio * cantidad de orderItem
        const totalAmount = orderItems.reduce((total, item) => {
            return total + (item.price * item.quantity)
        }, 0);

        //Actualizar el total en la tabla Order
        await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                totalAmount
            }
        })

        return totalAmount;
    } catch (error) {
        console.error("Error al calcular el totalAmount", error)
        throw new Error("Error al calcular el total de la orden")
    }

}

//Limite de stock
const STOCK_THRESHOLD = 5 // notificaremos si el stock esta bajo de 5
// Convertir el carrito en una orden
export const createOrderFromCart = async (userId) => {
    //obtener el carrito del usuario
    const cart = await prisma.cart.findUnique({
        where: {
            userId
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        } // incluimos los productos en el carrito
    })

    if (!cart || cart.items.length === 0) {
        throw new Error('El carrito esta vacio')
    }

    //verificar si hay suficiente stock para cada producto
    for (const item of cart.items) {
        const product = item.product;
        if (product.stock < item.quantity) {
            throw new Error(`No hay suficiente stock para el producto: ${product.name}`)
        }
    }

    //Crear una nueva orden en estado Pending (pendiente de pago)
    const order = await prisma.order.create({
        data: {
            user: {
                connect: {
                    id: userId
                }
            },
            totalAmount: cart.items.reduce((total, item) => total + item.quantity * item.product.price, 0),
            status: 'PENDING',
            items: {
                create: cart.items.map(item => ({
                    product: {
                        connect: {
                            id: item.productId
                        }
                    },
                    quantity: item.quantity,
                    price: item.product.price
                }))
            }
        }
    })

    //reducir el stock de cada producto y verificar si se encuentra por debajo del umbral
    for (const item of cart.items) {
        const updateProduct = await prisma.product.update({
            where: {
                id: item.productId
            },
            data: {
                stock: {
                    decrement: item.quantity
                }
            } // reducimos el stock
        })
        if (updateProduct.stock < STOCK_THRESHOLD) {
            notifyLowStock(updateProduct)
        }
    }

    //vaciar el carrito despues de crear la orden
    await prisma.cartItem.deleteMany({
        where: {
            cartId: cart.id
        }
    })
    return order;
}

//Funcion para generar una factura despues del pago
export const generateInvoice = async (orderId) => {
    //Obtener la orden y sus detalles
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        },
        include: {
            items: {
                include: {
                    product: true
                }
            }
        }
    })
    if (!order) {
        throw new Error('Orden no encontrada')
    }
    // Crear el número de la factura (puedes personalizar este formato)
    const invoiceNumber = `INV-${orderId}-${Date.now()}`;

    //Crear la factura en la base de datos
    const invoice = await prisma.invoice.create({
        data: {
            orderId: order.id,
            invoiceNumber,
            totalAmount: order.totalAmount,
            invoiceDetails: {
                create: order.items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.price
                }))
            }
        }
    })
    return invoice
}

// Simular el pago de una orden
export const payForOrder = async (orderId) => {
    // Verificar que el orderId esté definido y sea un número válido
    if (!orderId || isNaN(orderId)) {
        throw new Error('El ID de la orden es inválido o no está definido');
    }

    // Buscar la orden
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    });

    if (!order) {
        throw new Error('Orden no encontrada');
    }

    if (order.status !== 'PENDING') {
        throw new Error('Esta orden ya ha sido pagada o cancelada');
    }

    // Actualizar el estado de la orden a PAID (Pagado)
    const updatedOrder = await prisma.order.update({
        where: {
            id: orderId
        },
        data: {
            status: 'PAID'
        } // Cambiar el estado a Pagado
    });

    //generarla factura
    const invoice = await generateInvoice(orderId)

    return {
        updatedOrder,
        invoice
    };
};

// Obtener las órdenes de un usuario específico
export const getUserOrders = async (userId) => {
    try {
        console.log('Buscando órdenes para userId:', userId);
        const orders = await prisma.order.findMany({
            where: {
                userId
            }, // Filtramos por el ID del usuario
            include: {
                items: {
                    include: {
                        product: true
                    }
                }, // Incluir productos en los items de la orden
                user: true // Incluimos información del usuario
            },
        });

        return orders;
    } catch (error) {
        // Manejo del error si la consulta falla
        console.error('Error al buscar las órdenes en la base de datos:', error);
        throw new Error('Error al obtener las órdenes del usuario');
    }

};

const notifyLowStock = (product) => {
    console.log(`⚠️ El producto "${product.name}" tiene un stock bajo (${product.stock} unidades restantes).`)
}

// Obtener los pedidos de un usuario específico
export const getOrdersByUserId = async (userId) => {
    return prisma.order.findMany({
        where: {
            userId
        },
        include: {
            items: {
                include: {
                    product: true
                }
            },
            user: true
        }, // Incluye detalles de los productos y del usuario
    });
};