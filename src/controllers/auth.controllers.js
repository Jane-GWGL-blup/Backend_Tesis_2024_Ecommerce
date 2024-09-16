import bcrypt from 'bcryptjs'

import {generateToken} from '../services/auth.services.js'
import {prisma} from '../db/index.js'

//funcion de registro
export const registerUser = async (req,res) =>{
    const {name,email,password, role} = req.body
    try {
        // Comprobaremos si el usuario ya existe
        const userExist = await prisma.user.findUnique({
            where:{email}
        })
        if (userExist) {
            return res.status(400).json({message:" El usuario ya existe"})
        }

        // cifraremos la contraseña 
        const hashedPassword = await bcrypt.hash(password,10);

        // agregar el nuevo usuario en la base de datos
        const newUser = await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword,
                role
            }
        })

        // Crear el tokenjwt
        const token = generateToken(newUser);
            res.json({token})

    } catch (error) {

        console.error(error)
        res.status(500).json({message: "Error en el registro del usuario"})
    }
}

// Funcion de login
export const loginUser = async(req,res) =>{
    const { email, password} = req.body;

    try {
        //buscar usuario por email
        const user = await prisma.user.findUnique({
            where:{
                email
            }
        });
        if (!user){
            return res.status(404).json({error: 'Usuario no encontrado'})
        }

        // Comparar la contraseña ingresada con la cifrada
        const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({message: 'Contraseña incorrecta'})
            }

        // Generar token JWT
        const token = generateToken(user);
            res.json({token})

    } catch (error) {
        res.status(500).json({message: "Error en el inicio de sesion"})
    }
}