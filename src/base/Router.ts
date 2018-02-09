"use strict";

import * as KoaRouter from 'koa-router'
import { Logger, LoggerLevel } from '../utils/Logger'

export enum RouterMethod {
    GET  = "get",
    POST = 'post',
    ALL  = 'all',
    HEAD = 'head'
}

export class Router extends KoaRouter {
    constructor(...args:any[]) {
       super(...args);
    }
    private willFire(ctx:KoaRouter.IRouterContext) {
        Logger.info(LoggerLevel.APP,'willFire router action');
        Logger.info(LoggerLevel.APP,ctx);
    }
    add ( method:RouterMethod, path:string, action:KoaRouter.IMiddleware ) {
        let fn = this[method];
        fn && fn(path,this.willFire,action);
    }
}