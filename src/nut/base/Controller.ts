"use strict"

export class Controller {
    
    constructor() {

    }

    /**
     * automatically executed before action,can be used to set
     * example do authorization checks or form data verify
     */
    public beforeAction() {}

    /**
     * automatically executed after action,can be used to set
     * example transformation to the response, and ext output
     */
    public afterAction() {}
}