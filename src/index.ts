import express, {Request, Response} from "express";
import { userRouter } from "./user/user.route";


const app = express()

app.use(express.json())
app.use('/user', userRouter)


app.listen(3000, ()=>{
    console.log('server is running on port http://localhost:3000');
    
})