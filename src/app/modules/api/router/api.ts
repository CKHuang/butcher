"use strict" 

import { Router } from '../../../../nut'

export default class ApiRouter extends Router {
    constructor() {
        super();
        this.init();
    }
    init() {
        this.prefix('api');
        this.get('/name/:uid')
    }
}