import prisma from '../db/index.js'

async function createUser(data) {
    return await prisma.user.create({
        data,
    });
}

async function getUsers() {
    return await prisma.user.findMany();
}

const UserModel = {
    createUser,
    getUsers
};

export default UserModel;