import * as orderItemService from '../services/orderItems.services.js'

//Listado
export const getOrderItems = async (req,res)=>{
    try{
        const orderItems = await orderItemService.getAllOrederItem()
        res.json(orderItems)
    }catch(error){
        res.status(500).json({error: 'Erros al obtener los items de orden'})
    }
}

//creacion 
export const createOrderItem = async (req,res) =>{
    try {
        const orderItems = await orderItemService.createNewOrderItem(req.body)
        res.status(201).json(orderItems)
    } catch (error) {
        res.status(500).json({message: 'Error al crear el item de la orden'})
    }
}

//busqueda por Id
export const getOrderItemById = async (req,res) =>{
    try {
        const orderItemFound = await orderItemService.getAllOrderItemById(parseInt(req.params.id))
        if (!orderItemFound) {
            return res.status(404).json({error: 'Item de orden no encontrado'})
        }
        res.json(orderItemFound)
    } catch (error) {
        res.status(500).json({message: 'error al obtener items de la orden'})
    }
}

//eliminacion 
export const deleteOrdenItems = async (req,res) =>{
    try {
        const orderItemDelete = await orderItemService.deleteOrderItem(parseInt(req.params.id))
        res.json(orderItemDelete)
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el item de la orden '})
    }
}

//Actualizacion
export const updateOrderItems = async(req,res) => {
    try {
        const orderItemUpdate = await orderItemService.updateOrderItem(parseInt(req.params.id), req.body)
        res.json(orderItemUpdate)
    } catch (error) {
        res.status(500).json({error: 'Error al actualizar el item de la orden'})
    }
}