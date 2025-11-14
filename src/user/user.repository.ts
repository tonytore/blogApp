import { db } from "../../prisma/db";
import { updateUserData, userData } from "./user.service";

export async function listUserRepository() {
    try {
        const users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        })
        const filteredUsers = await users.map((user) => {
            const { password: _password, ...other } = user
            return other
        })  
        return filteredUsers
    } catch (error) {
        console.error(error)
        throw error
    }

}


export async function createUserRepository({email,password,name,bio,avatarUrl}:userData){
    try {
        const existingUser = await db.user.findUnique({
            where: { email },
        })
        if (existingUser) {
            throw new Error('User already exists')
        }

        const newUser = await db.user.create({
            data: { email, password, name, bio, avatarUrl },
        })

        const {password: savedPassword, ...other} = newUser

        return other
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function updateUserRepository({id,email,password,name,bio,avatarUrl}:updateUserData){
    try {
        const updatedUser = await db.user.update({
            where: { id },
            data: { email, password, name, bio, avatarUrl },
        })
        return updatedUser
    } catch (error) {
        console.error(error)
        throw error
    }
}

export async function deleteUserRepository(id:string){
    const deletedUser = await db.user.delete({
        where: {id}
    })

    return deletedUser
}