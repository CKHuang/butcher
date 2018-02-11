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

export abstract class Router extends KoaRouter {
    constructor(...args:any[]) {
       super(...args);
    }
    /**
     * 路由行为执行之前
     * @param ctx 
     */
    async before? ( ctx:KoaRouter.IRouterContext ) : Promise<Ret>
     /**
     * 路由行为执行之后
     * @param ctx 
     */
    async after? ( ctx:KoaRouter.IRouterContext ) : Promise<Ret>
    /**
     * 给路由行为包裹一层
     * @param action IRouterAction 路由行为
     */
    private wrap(action:IRouterAction) {
        return async ( ctx:KoaRouter.IRouterContext, next: () => Promise<any> ) => {
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
     * @example
     * 1、一般情况
     * Router.add(method,path,action) : Router
     * 2、写多个action
     * Router.add(method,path,action,action) : Router
     * 3、支持多个请求method
     * Router.add(method:RouterMethod[],)
     * 
     * 
     */
    add( method:RouterMethod, path:string, action:IRouterAction ) {
        let methFn = this[method];
        let args : any[] = [];
        let fns = ['before','after'];
        args.push(path);
        if ( typeof this.before == 'function' ) {
            args.push(this.wrap(this.before));
        }
        args.push( this.wrap(action) );
        if ( typeof this.after == 'function' ) {
            args.push(this.wrap(this.after));
        }
        methFn && methFn.apply(
            this,
            args
        );
    }
}