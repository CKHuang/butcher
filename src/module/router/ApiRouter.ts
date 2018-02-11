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
    console.log('timeOutFn');
    
    let val = await Promise.all([
        timeOutFn(),
        timeOutFn2()
    ]);
    console.log('timeOutFn2',val);
    ctx.body = "Hello World";
    
    return new Ret();
}

export default class ApiRouter extends Router {
    /**
     * Api控制器
     * @ApiController
     */
    private apiCtrl:ApiController;

    constructor() {
        super();
        this.apiCtrl = new ApiController();
        this.prefix('/api');
        this.add(RouterMethod.GET,'/name', name);
        // this.get('/name2',(ctx:KoaRouter.IRouterContext) => {
        //     console.log('-->name2',this);
        // });
    }
}