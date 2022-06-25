import express, { Request, Response } from "express";
import * as BookService from "./books.service";
import { BaseBook, Book } from "./book.interface";
import { parse } from "path";
import { request } from "http";

export const booksRouter = express.Router();

//Permitir que os livros sejam listados

booksRouter.get('/', async (req: Request, res: Response) => {
    try {
        const books: Book[] = await BookService.findAllBooks();

        res.status(200).send(books);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});


booksRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const book: Book = await BookService.findAbookById(id);

        if (book) {
            return res.status(200).send(book);
        }

        res.status(404).send("Book not found");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
})


//Permitir que os livros sejam cadastrados 

booksRouter.post("/", async (req: Request, res: Response) => {
    try {
        const book: BaseBook = req.body;

        const newBook = await BookService.create(book);

        res.status(201).json(newBook);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

//Permitir que os livros sejam alterados

booksRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const bookUpdate: Book = req.body;

        const existingBook: Book = await BookService.findAbookById(id);

        if (existingBook) {
            const updatedBook = await BookService.update(id, bookUpdate);
            return res.status(200).send(updatedBook)
        }

        const newBook = await BookService.create(bookUpdate);

        res.status(201).json(newBook);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

//Permiter deletar livros

booksRouter.delete("/:id", async (req: Request, res: Response)  => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await BookService.remove(id);

        res.sendStatus(204);
    }catch (e: any) {
        res.status(500).send(e.message);
    }
});