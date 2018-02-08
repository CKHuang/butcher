"use strict";

import { Router } from '../../base/Router';
import * as Koa from 'koa';
import ApiController from '../controller/Api'

export default class ApiRouter extends Router {
    constructor(...args:any[]) {
        super(args);
        this.controller = new ApiController();
    }
}