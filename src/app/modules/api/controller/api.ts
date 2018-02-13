"use strict"

import { Controller, Application } from "../../../../nut";

export default class ApiController extends Controller {
    constructor() {
        super();
    }
    async name( ctx:any ) {
        // ctx.body = "Hello World";
    }
}