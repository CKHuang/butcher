'use strict'

import * as EventEmitter from 'events'
import GitClient from './cvs/GitClient';
import SvnClient from './cvs/SvnClient';
import debug from './debug';
import config from '../config/app'
import code from '../config/code'
import { Repository } from './cvs/ClientBase';
import ExtError from './ExtError';

interface IProject {
    initialize(remotePath:string):Promise<boolean>
}

export enum ProjectTypes {
    SVN = 'Svn',
    GIT = 'Git'
}

export class Project extends EventEmitter implements IProject {
    private cvs:GitClient|SvnClient|null = null;
    private type:ProjectTypes;
    constructor(type:ProjectTypes) {
        super();
        this.type = type;
        return this;
    }
    initialize(remotePath:string):Promise<boolean> {
        const me = this;
        return new Promise((resolve,reject) => {
            debug.info('project initialize');
            debug.info('remotePath : '+remotePath);
            switch( me.type ) {
                case 'Svn' : me.cvs = new SvnClient({
                    name : 'Default',
                    password : config.svnAccount.password,
                    username : config.svnAccount.username,
                    remotePath : remotePath,
                    localPath  : "unknow"
                });
                case 'Git' : me.cvs = new GitClient({
                    name : 'Default',
                    password : config.gitAccount.password,
                    username : config.gitAccount.username,
                    remotePath : remotePath,
                    localPath  : 'unknow'
                });
            }
            if ( !me.cvs ) { 
                let error = new ExtError('project init cvs error');
                    error.code = code.project_init_cvs_error;
                    error.args = remotePath;
                reject();
                return ;
            }
            resolve();
        });
    }

}