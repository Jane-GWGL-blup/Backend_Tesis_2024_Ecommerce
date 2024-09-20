import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

// Middleware para verificar token
export const authenticateToken = (req, res, next) =>{

    const authHeader = req.headers['authorization'];
    //vericamos si el token esta presente en los encabezados
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401).json({message: 'Acceso no autorizado. Noe se proporcionoun token'}); //si no hay token, devuelve error

    //verificamos si el token es valido
    jwt.verify(token, SECRET_KEY, (err, user)=>{
        if (err){
            return res.sendStatus(403).json({message:'Token no valido o expirado'}); //si el token es invalido devuelve error  
        } 

        req.userId = user.id;
        next(); // si es valido continua con la solicitud
    })
}

export const authorizeRoles = (roles) =>{
    return (req,res,next) =>{
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message: 'No tienes permiso para acceder a esta ruta'})
        }
        next()
    } 
}