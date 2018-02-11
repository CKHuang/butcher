"use strict";

import { Router, RouterMethod } from '../../base/Router';
import * as KoaRouter from 'koa-router';
import * as Koa from 'koa';
import ApiController from '../controller/ApiController'
import { Ret } from '../../utils/Ret'



async function timeOutFn() {
    return await new Promise( resolve => { 
        setTimeout(() => {
            console.log('run timeOutFn')
            resolve("res timeOutFn")
        },1000)
    });
}

async function timeOutFn2() {
    return await new Promise( resolve => { 
        setTimeout(() => {
            console.log('run timeOutFn2')
            resolve("res timeOutFn2")
        },5000)
    });
}

async function name(ctx:KoaRouter.IRouterContext) : Promise<Ret> {
    
    let val = await Promise.all([
        timeOutFn(),
        timeOutFn2()
    ]);
    console.log('return val',val);
    ctx.body = "Hello World";
    
    return new Ret();
}

export default class ApiRouter extends Router {
    /**
     * Api控制器
     * @ApiController
     */
    private controller:ApiController;

    constructor() {
        super();
        this.controller = new ApiController();
        this.prefix('/api');
        // this.get('/name2',(ctx:KoaRouter.IRouterContext) => {
        //     console.log('-->name2',this);
        // });
    }

    registerRoutes() {
        this.add(RouterMethod.GET,'/name', name);
        this.get('/name',(ctx,next) => {
            
        },(ctx) => {

        });
    }
}