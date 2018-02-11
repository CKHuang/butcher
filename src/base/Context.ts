"use strict"

import * as KoaRouter from 'koa-router'
import * as Koa from "koa";

export class Context {
    
    protected ctx:KoaRouter.IRouterContext;

    constructor(ctx:KoaRouter.IRouterContext) {
        this.ctx = ctx;
    }
}