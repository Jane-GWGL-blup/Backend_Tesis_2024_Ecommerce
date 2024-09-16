import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'

export const generateToken = (user) =>{
    //Genera un token con la informacion del usuario (id y rol)
    return jwt.sign({id: user.id, role: user.role, name: user.name},SECRET_KEY, {expiresIn:'1h'});
}