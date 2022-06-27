import express from "express";
import { CommonRoutesConfig } from "./../../common/common.routes.config";
import UserController from "../controller/user.controller";

export default class UserRoutes extends CommonRoutesConfig{
    constructor(app: express.Application) {
        super(app, 'UserRoutes')
    }
    configureRoutes(): express.Application {
        this.app.route('/user').post(UserController.getOrCreate);
        return this.app;
    }
}

