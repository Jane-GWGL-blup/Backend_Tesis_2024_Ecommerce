
import * as orderService from '../services/orders.services.js'

// Listado
export const getOrders = async (req,res) => {
    try {
        const getOrder = await orderService.getAllOrders();
        res.json(getOrder)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las ordenes"})
    }
}

// Busqueda por ID
export const getOrdersById = async (req, res) => {
    try {
        const orderById = await orderService.getAllOrdersById(parseInt(req.params.id))
        if (!orderById) {
            return res.status(404).json({error: "Orden no encontrada"})
        }
        res.json(orderById)
    } catch (error) {
        res.status(500).json({error: " Error al obtener la orden"})
    }
}

// Crear una orden desde el carrito
export const createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrderFromCart(req.user.id);
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Simular el pago de una orden
export const payForOrder = async (req, res) => {
    try {
        const orderId = parseInt(req.params.id)
        if (isNaN(orderId)) {
            return res.status(400).json({message: 'El ID de la orden no es valido'})
        }
        const order = await orderService.payForOrder(orderId);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ELiminacion
export const deleteOrders = async (req,res) =>{
    try {
        const orderDelete = await orderService.deleteOrder(parseInt(req.params.id))
        res.json(orderDelete)
    } catch (error) {
        res.status(500).json({error: "Error al eliminar la orden"})
    }
}

// Actualizacion
export const updateOrders = async (req,res) => {
    try {
        const orderUpdate = await orderService.updateOrder(parseInt(req.params.id),req.body)
        res.json(orderUpdate)
    } catch (error) {
        res.status(500).json({error: "Error al actualizar la orden"})
    }
}

//obtener las ordenes de un usuario especifico (solo para USER)
export const getUserOrders = async (req,res) =>{
    try{
        const orders = await orderService.getUserOrders(req.user.id);
        res.json(orders);
    }catch(error){
        resizeTo.status(500).json({message: 'Error al obtener las ordenes del usuario'})
    }
}



