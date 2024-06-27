import UserModel from '../models/userModel.js'

async function createUser(req, res) {
    try {
        const user = await UserModel.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getUsers(req, res) {
    try {
        const users = await UserModel.getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const UserController = {
    createUser,
    getUsers
};

export default UserController;