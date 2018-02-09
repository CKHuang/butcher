"use strict";

import { Router } from '../../base/Router';
import * as KoaRouter from 'koa-router';
import * as Koa from 'koa';
import ApiController from '../controller/ApiController'

export default class ApiRouter extends Router {
    private apiCtrl:ApiController;
    constructor() {
        super();
        this.apiCtrl = new ApiController();
        this.prefix('/api');
        this.registerRoutes();
    }

    registerRoutes() {
        this.get('/name',this.apiCtrl.name);
    }
}