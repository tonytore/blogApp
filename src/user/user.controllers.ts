import { Request, Response } from 'express'
import * as svc from '../user/user.service'
import { db } from '../../prisma/db'

const userControllers = {
  listUser : async (req:Request, res:Response) => {
  try {
    const user = await svc.getUserService()
  return res.status(200).json(user)
  } catch (error) {
    console.log(error);
    
  }
},
createUser : async (req:Request, res:Response) => {
  const {email,password} = req.body
  try {
    const user = await svc.createUserService({email,password})
  return res.status(200).json(user)
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
  return res.status(200).json({
    msg : "user updated successfully",
    data : other,
    error: null
  })
  } catch (error) {
    console.log(error);
    
  }
},
deleteUser : async (req:Request, res:Response) => {
  const {id} = req.params
  try {
    const user = await svc.deleteUserService(id)
  return res.status(200).json("user deleted successfully")
  } catch (error) {
    console.log(error);
    
  }
}
}
export default userControllers