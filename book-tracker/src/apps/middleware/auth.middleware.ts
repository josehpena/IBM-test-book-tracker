import IResponse from "./../common/interface/response.interface";
import { Request, Response,  } from "express";

const isAuthorized  = function(req: Request, res: Response, next: any) {
    const userId = req.headers.user_id?.toString();
    if (!userId) {
        const response: IResponse = {
          success: false,
          message: "Unauthorized",
        }
        return res.status(401).send(response);
    }
    return next();
}
export default isAuthorized