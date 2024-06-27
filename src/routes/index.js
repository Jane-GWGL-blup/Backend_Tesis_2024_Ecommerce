import express from 'express'
import userRoutes from './userRoutes.js' 

const router = express.Router();

// otros routes según sea necesario

router.use('/users', userRoutes);
// usar router.use para otros routes


export default router;