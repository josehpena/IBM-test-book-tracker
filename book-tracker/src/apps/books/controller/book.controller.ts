import { Request, Response } from "express";
import { Book } from "../interface/book.interface";
import { IGradeUpdate } from "../interface/gradeUpdate.interface";
import IResponse from "../../common/interface/response.interface";
import { IStatusUpdate } from "../interface/statusUpdate.interface";
import bookService from "./../service/book.service";

class BookController {


    async getAllBooks(req: Request, res: Response){

        try{
            const userId = req.headers.user_id?.toString();
            console.log(userId);
            const books: Book[] = await bookService.geAList(userId);
            const response: IResponse ={
                success: true,
                data: books
            }
            return res.status(200).send(response);
    
        }catch(e: any) {
            const response: IResponse ={
                success: false,
                message: e.message
            }
            return res.status(404).send(response);
        }
        
    }
    
    async createNewBook (req: Request, res: Response) {
       try {
            const book: Book = req.body;
            const userId = req.headers.user_id;
            const newBook: Book = await bookService.create({...book, userId: userId});
            const response: IResponse ={
                success: true,
                data: newBook
            }
            return res.status(200).send(response);
    
        }catch(e: any) {
            const response: IResponse ={
                success: false,
                message: e.message
            }
            return res.status(404).send(response);
        }
    }
    
    async getOneBookById(req: Request, res: Response) {
        const id: string = req.params.id?.toString();
        const userId = req.headers.user_id?.toString();
        try {
    
            const book: Book = await bookService.getByBookId(id, userId);
            const response: IResponse ={
                success: true,
                data: book
            }
            return res.status(200).send(response);
            
        } catch (e: any) {
            const response: IResponse ={
                success: false,
                message: e.message
            }
            return res.status(404).send(response);
        }
    }
    

    async updateABook(req:Request, res:Response) {
        try {
            const id: string = req.params.id;
            const book: Book = req.body;
            const userId = req.headers.user_id?.toString();
            await bookService.update(id,book, userId);
            const response: IResponse ={
                success: true,
                data: book
            }
            res.status(200).send(response);
        } catch (e: any) {
            const response: IResponse ={
                success: false,
                message: e.message
            }
            res.status(404).send(response);
        }
    }
    
    async deleteABook(req:Request, res:Response) {
        try {
          const bookId: string = req.params.id;
          const userId = req.headers.user_id?.toString();
            const book = await bookService.remove(bookId, userId);
            const response: IResponse ={
                success: true,
                data: book
            }
            return res.status(200).send(response);
        } catch (e: any) {
            const response: IResponse ={
                success: false,
                message: e.message
            }
            return res.status(404).send(response);
        }
    }
    
    async changeBookStatus(req:Request, res:any) {
        try {
            const id: string = req.params.id;
            const data: IStatusUpdate = req.body;
            const userId = req.headers.user_id?.toString();
            const updateResult =  await bookService.update(id, { status: data.status }, userId);
            const response: IResponse ={
                success: true,
                data: updateResult
            }
            res.status(200).send(response);
        } catch (e: any) {
            const response: IResponse ={
                success: false,
                message: e.message
            }
            res.status(404).send(response);
        }
    }
    
    async changeBookGrade(req:Request, res:any) {
        try {
            const id: string = req.params.id;
            const { grade }: IGradeUpdate = req.body;
            const userId = req.headers.user_id?.toString();
            const updateResult =  await bookService.changeGrade(id, grade, userId);
            const response: IResponse ={
                success: true,
                data: updateResult
            }
            res.status(200).send(response);
        } catch (e: any) {
            const response: IResponse ={
                success: false,
                message: e.message
            }
            res.status(404).send(response);
        }
    }
}

export default new BookController();