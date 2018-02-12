"use strict";

import * as Koa from 'koa'

export enum Enviroment {
    DEVELOPMENT = 10,
    TESTING     = 20,
    PRODUCTION  = 30
}

export class Application extends Koa {

    /**
     * nut framework version
     */
    public static VERSION : string = '1.0.0';

    /**
     * current runtime enviroment
     */
    public ENVIROMENT : number = Enviroment.DEVELOPMENT;

    constructor(...args:any[]) {
        super(...args);
    }

    /**
     * set application runtime enviroment
     * @param env {Enviroment}
     */
    setEnv(env:Enviroment) {
        this.ENVIROMENT = env;
    }

    /**
     * judge is or not develop enviroment
     * @return {boolean}
     */
    isDevEnv() {
        return this.ENVIROMENT == Enviroment.DEVELOPMENT;
    }

    /**
     * judge is or not test enviroment
     * @return {boolean}
     */
    isTestEnv() {
        return this.ENVIROMENT == Enviroment.TESTING;
    }

    /**
     * judge is or not product enviroment
     * @return {boolean}
     */
    isProdEnv() {
        return this.ENVIROMENT == Enviroment.PRODUCTION;
    }
}