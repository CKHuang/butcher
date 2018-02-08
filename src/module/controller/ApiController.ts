"use strict";

import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import BaseController from '../../base/Controller'

export default class ApiController extends BaseController {
    constructor(){
        super();
    }

    async name(ctx:KoaRouter.IRouterContext) {
        ctx.body = "Hello World";
    }
}