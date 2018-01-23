'use strict'

import * as fs from 'fs'

export enum RepositoryTypes {
    SVN = 'Svn',
    GIT = 'Git'
}

interface RepositoryConfig {
    name:string
    localPath:string
    remotePath:string
    username:string
    password:string
    type:RepositoryTypes
}

interface IRepository {
    checkout():Promise<boolean>,
    update():Promise<boolean>
}

export class Repository implements IRepository {
    private config:RepositoryConfig;
    constructor(config:RepositoryConfig) {
        this.config = config;
        
    }
    private isLocalExist() : boolean {
        return fs.existsSync(this.config.localPath);
    }
    checkout():Promise<boolean> {
        return new Promise((resolve,reject) => {
            resolve(true);
        })
    }
    update():Promise<boolean> {
        return new Promise((resolve,reject) => {
            resolve(true);
        })
    }
}