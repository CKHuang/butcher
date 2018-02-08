"use strict";

import * as KoaRouter from 'koa-router'
import BaseController from './Controller'

export abstract class Router extends KoaRouter {
    /**
     * 路由器里面的控制器
     * @BaseController
     */
    protected controller:BaseController;
    constructor(...args:any[]) {
       super(...args);
    }
}