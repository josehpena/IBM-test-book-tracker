import HttpException from "../common/http-exception";
import { Request, Response, NextFunction } from "express";
import IResponse from "../common/interface/response.interface";

export const errorHandler = (
    error: HttpException,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.statusCode || error.status || 5000;

    const errorResponse: IResponse = {
        success: false,
        message: error.message || "Something went wrong",
    }
    response.status(status).send(errorResponse);
}