import { Router } from 'express'
import userControllers from './user.controllers'


export const userRouter = Router()

userRouter.get('/', userControllers.listUser)
userRouter.post('/', userControllers.createUser)
userRouter.put('/:id', userControllers.updateUser)
userRouter.delete('/:id', userControllers.deleteUser)