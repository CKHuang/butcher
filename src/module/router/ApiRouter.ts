"use strict";

import { Router, RouterMethod } from '../../base/Router';
import * as KoaRouter from 'koa-router';
import * as Koa from 'koa';
import ApiController from '../controller/ApiController'

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
        this.add(RouterMethod.GET,'/name',this.apiCtrl.name)
    }
}