import IResponse from "../../common/interface/response.interface";
import { Request, Response } from "express";
import { IUser } from "../interface/user.interface";
import userService from "./../service/user.service";

class UserController {

   async getOrCreate(req: Request, res: Response){
    try {
        
         const user: IUser = req.body;
         const userResult: IUser = await userService.findOrCreate(user);
         const response: IResponse ={
             success: true,
             data: userResult
         }
         res.set('user_id', userResult.id);
         return res.status(200).send(response);
 
     }catch(e: any) {
         const response: IResponse ={
             success: false,
             message: e.message
         }
         return res.status(404).send(response);
     }
 }
}

export default new UserController();