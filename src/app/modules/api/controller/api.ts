"use strict"

import { Controller, Application, Context } from "../../../../nut";

export default class ApiController extends Controller {
    constructor() {
        super();
    }
    async name( ctx:Context ) {
        // ctx.body = "Hello World";
    }
}