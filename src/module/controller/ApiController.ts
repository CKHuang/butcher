"use strict";

import * as Koa from 'koa';
import * as KoaRouter from 'koa-router';
import BaseController from '../../base/Controller'
import { Logger } from '../../utils/Logger'
import { setTimeout } from 'timers';
import { Ret } from '../../utils/Ret'


export default class ApiController extends BaseController {
    constructor(){
        super();
    }
}