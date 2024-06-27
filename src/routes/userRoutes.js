import express from 'express'
//import { Router } from 'express';
import UserController from '../controllers/userController.js'

const router = express.Router();


router.post('/create', UserController.createUser);
router.get('/list', UserController.getUsers);
// otras rutas y métodos según sea necesario

// const UserRouter = {
//     router
// };

// export default UserRouter;
export default router