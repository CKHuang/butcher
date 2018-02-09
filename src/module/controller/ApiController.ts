"use strict";

import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import BaseController from '../../base/Controller'
import { Logger } from '../../utils/Logger'

export default class ApiController extends BaseController {
    constructor(){
        super();
    }

    async name(ctx:KoaRouter.IRouterContext,next:any) {
        Logger.info('fire api controller name');
        ctx.body = "Hello World 2";
        next();
    }
}