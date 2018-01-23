'use strict'

import * as fs from 'fs'

export enum RepositoryTypes {
    SVN = 'SVN',
    GIT = 'GIT'
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
    checkout():boolean,
    update():boolean
}

export class Repository {
    private config:RepositoryConfig;
    constructor(config:RepositoryConfig) {
        this.config = config;
    }
    private isLocalExist() : boolean {
        return fs.existsSync(this.config.localPath);
    }
    checkout() {

    }
    update() {
        
    }
}