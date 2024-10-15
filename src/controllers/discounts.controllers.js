import * as discountService from '../services/discounts.services.js'

//crear un nuevo descuento
export const createDiscount = async (req, res) => {
    try {
        const { code, description, percentage, startDate, endDate, productId, categoryId } = req.body;

        // Convertir `percentage` a número
        const percentageNumber = parseFloat(percentage);
        if (isNaN(percentageNumber)) {
            return res.status(400).json({ message: 'El porcentaje debe ser un número válido' });
        }

        // Convertir `startDate` y `endDate` a objetos `Date`
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Verificar si las fechas son válidas
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ message: 'Las fechas deben ser válidas' });
        }

        const newDiscount = await discountService.createDiscount({
            code,
            description,
            percentage: percentageNumber,
            startDate: start,
            endDate: end,
            productId: productId ? parseInt(productId) : null,
            categoryId: categoryId ? parseInt(categoryId) : null
        });
        res.status(201).json(newDiscount);
    } catch (error) {
        console.error('Error al crear el descuento:', error);
        res.status(500).json({ message: 'Error al crear el descuento' });
    }
};
// Obtener todos los descuentos
export const getDiscounts = async (req, res) => {
    try {
        const discounts = await discountService.getAllDiscounts();
        res.json(discounts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los descuentos' });
    }
};

// Actualizar un descuento
export const updateDiscount = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedDiscount = await discountService.updateDiscount(parseInt(id), req.body);
        res.json(updatedDiscount);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el descuento' });
    }
};

// Eliminar un descuento
export const deleteDiscount = async (req, res) => {
    const { id } = req.params;
    try {
        await discountService.deleteDiscount(parseInt(id));
        res.json({ message: 'Descuento eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el descuento' });
    }
};
// Obtener un descuento por ID
export const getDiscountById = async (req, res) => {
    try {
        const { id } = req.params;
        const discount = await discountService.getDiscountById(parseInt(id));

        if (!discount) {
            return res.status(404).json({ message: 'Descuento no encontrado' });
        }

        res.json(discount);
    } catch (error) {
        console.error('Error al obtener el descuento:', error);
        res.status(500).json({ message: 'Error al obtener el descuento' });
    }
};