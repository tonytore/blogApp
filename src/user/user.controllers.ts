import { Request, Response } from 'express'
import * as svc from '../user/user.service'
import bcrypt from 'bcrypt'
import { db } from '../config/db'
import { successResponse } from '../utils/helper/response_helper'

const userControllers = {
  listUser : async (req:Request, res:Response) => {
  try {
    const user = await svc.getUserService()
  return successResponse(res, 'User List', user);
  } catch (error) {
    console.log(error);
    
  }
},
createUser : async (req:Request, res:Response) => {
  const {email,password} = req.body
  try {
    const user = await svc.createUserService({email,password})
  return successResponse(res, 'User Created', user, 201);
  } catch (error) {
    console.log(error);
    
  }
},
updateUser : async (req:Request, res:Response) => {
  const {id} = req.params
  const {email,password,name,bio,avatarUrl} = req.body
  try {
    const existingUser = await db.user.findUnique({where:{id}})
    if(!existingUser){
      return res.status(404).send({
        data: null,
        mas: "user not found"
      })
    }
    const user = await svc.updateUserService({id,email,password,name,bio,avatarUrl})
    const {password:_pass, ...other} = user
  return successResponse(res, 'User Updated', user);
  } catch (error) {
    console.log(error);
    
  }
},

updateUserPasswordById : async(req:Request, res:Response) =>{
  const { id } = req.params
  const { password } = req.body
  try {const user = await db.user.findUnique({where:{id}})
  if(!user){
    res.status(404).send({
      data: null,
      mas: "user not found"
    })
  }

  const hashedPassword:string = await bcrypt.hash(password, 10)


  const updatePassword = await db.user.update({
    where: { email: user?.email },
    data: { password: hashedPassword },

  })

  return successResponse(res, 'User Password updated', updatePassword);
    
  } catch (error) {
    
  }

},


deleteUser : async (req:Request, res:Response) => {
  const {id} = req.params
  try {
    const user = await svc.deleteUserService(id)
  return successResponse(res, 'User Deleted', user);
  } catch (error) {
    console.log(error);
    
  }
}
}
export default userControllers