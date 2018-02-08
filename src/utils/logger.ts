"use strict";

interface InvokeInput {
    args?:any
}
interface InvokeOutput {
    res?:any
}

enum LoggerType {
    INF = 'INF',
    STR = 'STR',
    END = 'END',
    IVK = 'IVK',
    ERR = 'ERR'
}

export enum LoggerLevel {
    SYS = 'SYS',
    APP = "APP"
}

export class Logger {
    
    private static cache : any = {};

    private static isDebug = true;

    private static print(...args:any[]) {
        if ( this.isDebug ) {
            let color = "\x1B[37m%s\x1B39m";
            switch ( args[0] ) {
                case LoggerType.INF : color = "\x1B[36m%s\x1B[0m";break;
                case LoggerType.STR :
                case LoggerType.IVK : 
                case LoggerType.END : color = "\x1B[35m%s\x1B[39m";break;
                case LoggerType.ERR : color = "\x1B[31m%s\x1B[39m";break;
            }
            global.console.log.apply(console,[color,args]);
        }
    }

    static info(...args:any[]) {
        this.print(LoggerType.INF,args);
    }

    static error(...args:any[]) {
        this.print(LoggerType.ERR,args);
    }

    static start(action:string,input?:InvokeInput) {
        let args = input && input.args ? JSON.stringify(input.args) : "";
        this.cache[action] = {
            input : args,
            st : Date.now()
        };
    }

    static end(action:string,output?:InvokeOutput) {
        let res = output && output.res ? JSON.stringify(output.res) : "";
        let args = "";
        let use = 0;
        if ( this.cache[action] ) {
            let start = this.cache[action];
            use = Date.now() - start.st;
            delete this.cache[action];
        }
        this.print(LoggerType.IVK,`Act:${action}`,`Args:${args}`,`Res:${res}`,`Use:${use}ms`);
    } 
}