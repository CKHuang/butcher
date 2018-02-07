'use strict'

import { spawn } from 'child_process'
import ExtError from '../ExtError'
import * as fs from 'fs'
import debug from '../debug'

enum ErrorCode {
    UNKNOW = 999,
    DISCONNECT = 1000,
    EXIT = 1001,
    EXEERROR = 1002,
}

export enum ClientTypes {
    GIT = 'git',
    SVN = 'svn'
}

export interface IClientBase {
    checkout():Promise<any>
    update():Promise<any>
    isLocalExist():boolean
}

export interface Repository {
    name:string
    localPath:string
    remotePath:string
    username:string
    password:string
}

export interface InvokeRes {
    data:string[],
    error:string[]
}

interface InvokeOpts {
    cwd?:string
}

export class ClientBase {
    private type : ClientTypes;
    protected rep : Repository;
    constructor(type:ClientTypes) {
        this.type = type;
    }
    private isInvokeError(res:InvokeRes) : boolean {
        return res.error.length > 0 ? true : false;
    }
    protected invoke(args:string[],opts?:InvokeOpts) : Promise<InvokeRes> {
        let me = this;
        return new Promise((resolve,reject) => {
            debug.start('ClientBase.invoke',{args:{type:me.type,args:{args:args,opts:opts}}});
            const ls = typeof opts == 'object' ? spawn(me.type,args,opts) : spawn(me.type,args);
            const _data : string[] = [];
            const _err : string[] = [];
            const isError = me.isInvokeError;
            ls.stdout.on('data', (data:string) => {
                debug.info('ClientBase.invoke on(data):',data);
                _data.push(data.toString());
            });
            ls.stderr.on('error', (error:string) => {
                debug.info('ClientBase.invoke on(error):',error);
                _err.push(error.toString());
            });
            ls.on('close', (code) => {
                debug.info('ClientBase.invoke on(close):',code);
                let res : InvokeRes = { data : _data, error : _err }
                if ( isError(res) ) {
                    let error = new ExtError('throw error message');
                        error.args = res;
                        error.code = ErrorCode.EXEERROR;
                    reject(error);
                } else {
                    resolve(res);
                }
            });
            ls.on('error',(err) => {
                debug.info('ClientBase.invoke on(error):',err);
                ls.kill();
                let error = new ExtError(err);
                    error.code = ErrorCode.EXEERROR;
                reject(error);  
            })
            ls.on('disconnect',() => {
                debug.info('ClientBase.invoke on(disconnect)');
                ls.kill();
                let error = new ExtError(me.type + ' disconnect');
                    error.args = args;
                    error.code = ErrorCode.DISCONNECT;
                reject(error);
            });
            ls.on('exit',(code) => {
                debug.info('ClientBase.invoke on(exit):',code);
                debug.end('ClientBase.invoke',{res:code});
                if ( code == 0 ) {
                    let res : InvokeRes = { data : _data, error : _err }
                    resolve(res);
                } else {
                    ls.kill();
                    let error = new ExtError(me.type + ' exit[code:' + code + ']' );
                        error.args = args;
                        error.code = ErrorCode.EXIT;
                    reject(error);
                }
            });
        });
    }
}