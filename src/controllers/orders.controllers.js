import {createNewOrder,deleteOrder,getAllOrders,getAllOrdersById, updateOrder} from '../services/orders.services.js'

// Creacion
export const createOrder = async (req, res) => {
    try {
        const newOrder = await createNewOrder(req.body);
        res.status(201).json(newOrder)
    } catch (error) {
        res.status(500).json({ message: "Error al crear la orden"})
    }
}

// Listado
export const getOrders = async (req,res) => {
    try {
        const getOrder = await getAllOrders();
        res.json(getOrder)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las ordenes"})
    }
}

// Busqueda por ID
export const getOrdersById = async (req, res) => {
    try {
        const orderById = await getAllOrdersById(parseInt(req.params.id))
        if (!orderById) {
            return res.status(404).json({error: "Orden no encontrada"})
        }
        res.json(orderById)
    } catch (error) {
        res.status(500).json({error: " Error al obtener la orden"})
    }
}

// ELiminacion
export const deleteOrders = async (req,res) =>{
    try {
        const orderDelete = await deleteOrder(parseInt(req.params.id))
        res.json(orderDelete)
    } catch (error) {
        res.status(500).json({error: "Error al eliminar la orden"})
    }
}

// Actualizacion
export const updateOrders = async (req,res) => {
    try {
        const orderUpdate = await updateOrder(parseInt(req.params.id),req.body)
        res.json(orderUpdate)
    } catch (error) {
        res.status(500).json({error: "Error al actualizar la orden"})
    }
}