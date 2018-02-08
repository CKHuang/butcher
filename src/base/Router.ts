"use strict";

import * as KoaRouter from 'koa-router'

export abstract class Router extends KoaRouter {
    constructor(...args:any[]) {
       super(...args);
    }
}