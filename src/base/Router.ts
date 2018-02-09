"use strict";

import * as KoaRouter from 'koa-router'
import { Logger, LoggerLevel } from '../utils/Logger'

export enum RouterMethod {
    GET  = "get",
    POST = 'post',
    ALL  = 'all',
    HEAD = 'head'
}

interface IKoaRouter {

}

export class Router extends KoaRouter {
    constructor(...args:any[]) {
       super(...args);
    }
    private before(ctx:KoaRouter.IRouterContext,next:any) {
        Logger.info('before router');
        next();
    }
    private after(ctx:KoaRouter.IRouterContext,next:any) {
        Logger.info('after router');
        next();
    }
    private wrap(action:any,ctx:KoaRouter.IRouterContext,next:any) {
        Logger.info('fire router');
        action(ctx);
        next();
    }
    add ( method:RouterMethod, path:string, action:KoaRouter.IMiddleware ) {
        let fn;
        switch ( method ) {
            case RouterMethod.GET  : fn = super.get;break;
            case RouterMethod.POST : fn = super.post;break;
            case RouterMethod.ALL  : fn = super.all;break;
            case RouterMethod.HEAD : fn = super.head;break;
        }

        fn && fn.call(this,path,this.before,action,this.after);
    }
}