import {Router } from 'express'
import { authenticateToken } from '../middlewares/auth.middleware.js'
import {getUserProfile,updateUserProfile,deleteUserProfile} from '../controllers/profile.controllers.js'

const router = Router()
// //login al perfil
// router.get('/profile', authenticateToken, (req,res)=>{
//     res.json({message: `Bienvenido ${req.user.name}`})
// })
//obtener el perfil del usuario autenticado
router.get('/profile',authenticateToken,getUserProfile)
router.put('/profile',authenticateToken,updateUserProfile)
router.delete('/profile', authenticateToken,deleteUserProfile)



export default router;