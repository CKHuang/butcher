"use strict";

import * as KoaRouter from 'koa-router'
import { Logger, LoggerLevel } from '../utils/Logger'
import { Ret } from '../utils/Ret'

export enum RouterMethod {
    GET  = "get",
    POST = 'post',
    ALL  = 'all',
    HEAD = 'head'
}

export interface IRouterAction {
    ( ctx:KoaRouter.IRouterContext ) : Promise<Ret>
}

var st;

export abstract class Router extends KoaRouter {
    constructor(...args:any[]) {
       super(...args);
    }
    /**
     * 路由行为执行之前
     * @param ctx 
     */
    abstract async before ( ctx:KoaRouter.IRouterContext ) : Promise<Ret>
     /**
     * 路由行为执行之后
     * @param ctx 
     */
    abstract async after ( ctx:KoaRouter.IRouterContext ) : Promise<Ret>
    /**
     * 给路由行为包裹一层
     * @param action IRouterAction 路由行为
     */
    private wrap(action:IRouterAction) {
        return async ( ctx:KoaRouter.IRouterContext, next: () => Promise<any> ) => {
            Logger.info('before wrap');
            let ret = await action(ctx);
            console.log('action->ret',ret);
            await next();
        }
    }
    /**
     * 添加路由规则以及路由行为
     * @param method {RouterMethod} 请求方式
     * @param path   {string} 请求的URL规则
     * @param action {IRouterAction} 路由行为action
     */
    add( method:RouterMethod, path:string, action:IRouterAction ) {
        let methFn = this[method];
        methFn && methFn.call(
            this,
            path,
            this.wrap(this.before),
            this.wrap(action),
            this.wrap(this.after)
        );
    }
}