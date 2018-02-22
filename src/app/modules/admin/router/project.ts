"use strict"

import { Router } from '../../../../nut'
import Controller from '../controller/project'

export default class ProjectRouter extends Router {

    private controller : Controller;

    constructor() {
        super();
        this.controller = new Controller();
        this.init();
    }
    
    init() {
        this.prefix('/project');
        this.get('/',this.controller.list);
        this.get('/:pid',this.controller.detail);
    }
}