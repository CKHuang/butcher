"use strict";

import * as KoaRouter from 'koa-router'

export interface IRouter {
    setRoutes() : Router
}

export abstract class Router extends KoaRouter {
    constructor(...args:any[]) {
       super(...args);
    }
}