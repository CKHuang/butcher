"use strict";

import { Router, IRouter } from '../../base/Router';
import * as Koa from 'koa';

class ApiRouter extends Router implements IRouter {
    constructor() {
        super();
    }
    setRoutes() {
       return this;
    }
    async name(ctx:any) {
        
    }
}