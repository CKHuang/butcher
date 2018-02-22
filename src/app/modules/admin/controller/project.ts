"use strict"

import { Controller, Application } from "../../../../nut";

export default class ProjectController extends Controller {
    constructor() {
        super();
    }
    async list( ctx:any ) {
        await ctx.render('projects');
    }
    async detail( ctx:any ) {

    }
}