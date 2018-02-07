"use strict";

import * as Router from 'koa-router'

export class Controller {
    protected router:Router;
    constructor() {
        this.router = new Router();
    }
}