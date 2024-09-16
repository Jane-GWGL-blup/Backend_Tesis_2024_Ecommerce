import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'


// Middleware para verificar token
export const authenticateToken = (req, res, next) =>{

    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.sendStatus(401); //si no hay token, devuelve error

    jwt.verify(token, SECRET_KEY, (err, user)=>{
        if (err) return res.sendStatus(403); //si el token es invalido devuelve error
        req.user = user;
        next(); // si es valido continua con la solicitud
    })
}

export const authorizeRoles = (roles) =>{
    return (req,res,next) =>{
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({message: 'Notienes permiso para acceder a esta ruta'})
        }
        next()
    } 
}