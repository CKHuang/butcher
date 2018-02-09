"use strict";

import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import BaseController from '../../base/Controller'
import { Logger } from '../../utils/Logger'
import { setTimeout } from 'timers';

async function timeOutFn() {
    setTimeout(() => {
        return 'Out'
    },1000);
}

export default class ApiController extends BaseController {
    constructor(){
        super();
    }

    async name(ctx:KoaRouter.IRouterContext) {
        Logger.info('fire api controller name');
        let val = await timeOutFn();
        Logger.info('fire api controller name 2');
        ctx.body = "Hello World 2";
        
    }
}