import MongooseClient from "./../config/db";
import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { CommonRoutesConfig } from "./common/common.routes.config";
import BookRoutes from "./books/router/books.router";
import UserRoutes from "./users/router/user.router";
import * as http from 'http';
import { errorHandler } from "./middleware/error.middleware";
import helmet from "helmet";
dotenv.config();

export default class App{

  mongooseClient = new MongooseClient()
  app: express.Application = express()
  routes: Array<CommonRoutesConfig> = [];
  server: http.Server = http.createServer(this.app)
  async start(){
    // config of app
    await this.configApp()
    this.startServices()
    this.configRoutes()

    // check env
    if (!process.env.PORT){
      console.log("PORT environment variable not specified");
      process.exit(1);
    };

    // start server
    this.server.listen(process.env.PORT, () => {
      console.debug(`Server running at http://localhost:${process.env.PORT}`);
      this.routes.forEach((route: CommonRoutesConfig) => {
          console.log(`Routes configured for ${route.getName()}`);
      });
  });

  }
  private async configApp(){
    this.app.use(express.json());
    this.app.use(cors())
    this.app.use(helmet());
  }

  private async configRoutes(){
    this.routes.push( new UserRoutes(this.app))
    this.routes.push(new BookRoutes(this.app))
    this.app.use(errorHandler);
  }

  private async startServices(){
    this.mongooseClient.connect();

  }
}