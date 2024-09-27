import * as userServices from '../services/profile.services.js'
import bcrypt from 'bcryptjs'

//obtener el perfil del usuario
export const getUserProfile = async (req,res) =>{
    try {
        const user = await userServices.getUserById(req.user.id)
        if (!user) {
            return res.status(404).json({message:'usuario no encontrado'})
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({message:'Error al obtener el perfil del usuario'})
    }
}

// Actualizar perfil del usuario
export const updateUserProfile = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
        const updatedUser = await userServices.updateUser(req.user.id, {
            name,
            email,
            ...(hashedPassword && { password: hashedPassword })
        });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el perfil del usuario' });
    }
};
// Eliminar la cuenta del usuario
export const deleteUserProfile = async (req, res) => {
    try {
        await userServices.deleteUser(req.user.id);
        res.json({ message: 'Cuenta eliminada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la cuenta' });
    }
};