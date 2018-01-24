import { spawn } from 'child_process'
import { resolve } from 'url';

export enum CvsClientTypes {
    GIT = 'git',
    SVN = 'svn'
}

export interface ICvsClient {
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

export class CvsClient {
    private type : CvsClientTypes;
    constructor(type:CvsClientTypes) {
        this.type = type;
    }
    protected invoke() {
        let me = this;
        return new Promise((resolve,reject) => {
            const ls = spawn(me.type);
            const _data : string[] = [];
            const _err : string[] = [];
            ls.stdout.on('data', (data:string) => {
                _data.push(data);
            });
            ls.stderr.on('error', (error:string) => {
                _err.push(error);
            });
            ls.on('close', (code) => {
                
            });
            ls.on('error',(err) => {
                reject(err);
            })
        });
    }
}