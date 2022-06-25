import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { booksRouter } from "./apps/books/books.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";
import 'reflect-metadata';
import connection from './config/db';
import { server } from './config/index'

dotenv.config();

if (!process.env.PORT){
    console.log("PORT environment variable not specified");
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/books", booksRouter)

app.use(errorHandler);
app.use(notFoundHandler);

connection.then(() => {
    // precisamos importar o express somente após a conexão com a base, ou então o typeorm vai reclamar que alguns repositories não existem
    app.listen(server.port, () => {
        console.log("listening on port " + server.port);
    });
});