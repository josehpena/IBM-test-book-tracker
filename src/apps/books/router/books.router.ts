import express from "express";
import isAuthorized from "../../middleware/auth.middleware";
import { CommonRoutesConfig } from "./../../common/common.routes.config";
import bookController from "../controller/book.controller";

export default class BookRoutes extends CommonRoutesConfig {
    constructor(app: express.Application){
        super(app, 'BookRoutes');

    }
    configureRoutes(): express.Application{
        this.app.route('/books')
        .all(isAuthorized)
        .get(bookController.getAllBooks)
        .post(bookController.createNewBook)
        .put()
        .delete();

        this.app.route('/books/:id')
        .all(isAuthorized)
        .get(bookController.getOneBookById)
        .post()
        .put(bookController.updateABook)
        .delete(bookController.deleteABook);

        this.app.route('/books/setstatus/:id')
        .all(isAuthorized)
        .get()
        .post()
        .put(bookController.changeBookStatus)
        .delete();

        this.app.route('/books/changegrade/:id')
        .all(isAuthorized)
        .get()
        .post()
        .put(bookController.changeBookGrade)
        .delete();
        return this.app
    }

}

