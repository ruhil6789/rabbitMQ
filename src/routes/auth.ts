import { Router,Request,Response } from "express";
import { User } from "../schema";
import { IUserService } from "../services";

const createAuthRouter=(service:IUserService)=>{

    const router = Router()

    router.post('/login',async(req:Request,res:Response): Promise<void> => {
        try {
            const result = await service.login(req.body.email,req.body.password)

            res.json({
                success:true,
                data:result
            })
            
        } catch (error) {
                res.json({
                    error:error.message
                })            
        }
    })


    router.post('/register', async (req: Request, res: Response): Promise<void> => {
        try {
            const user: User = {
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                fullname: req.body.fullname,
            }
            const result = await service.register(user)
            res.json({
                success: true,
                data: result,
            })
        } catch (error: any) {
            res.json({
                error: error.message,
            })
        }
    })

    return router

}


export default createAuthRouter