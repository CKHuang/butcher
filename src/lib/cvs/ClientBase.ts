import { spawn } from 'child_process'
import ExtError from '../ExtError'

export enum ClientTypes {
    GIT = 'git',
    SVN = 'svn'
}

export interface IClientBase {
    checkout():any
    update():any
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

export class ClientBase {
    private type : ClientTypes;
    constructor(type:ClientTypes) {
        this.type = type;
    }
    private isInvokeError(res:InvokeRes) : boolean {
        return res.error.length > 0 ? true : false;
    }
    protected invoke(args:string[]) : Promise<InvokeRes> {
        let me = this;
        return new Promise((resolve,reject) => {
            const ls = spawn(me.type,args);
            const _data : string[] = [];
            const _err : string[] = [];
            const isError = me.isInvokeError;
            ls.stdout.on('data', (data:string) => {
                _data.push(data);
            });
            ls.stderr.on('error', (error:string) => {
                _err.push(error);
            });
            ls.on('close', (code) => {
                let res : InvokeRes = { data : _data, error : _err }
                if ( isError(res) ) {
                    let error = new ExtError('throw error message');
                        error.args = res;
                    reject(error);
                } else {
                    resolve(res);
                }
            });
            ls.on('error',(err) => {
                let error = new ExtError(err);
                reject(error);
            })
        });
    }
}