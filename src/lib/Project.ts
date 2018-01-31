'use strict'

import * as EventEmitter from 'events'
import GitClient from './cvs/GitClient';
import SvnClient from './cvs/SvnClient';
import debug from './debug';
import config from '../config/app'
import Code from '../config/code'
import { Repository } from './cvs/ClientBase';
import ExtError from './ExtError';
import { resolve } from 'url';
import { Task } from './Task';

interface IProject {
    // initialize(remotePath:string):Promise<boolean>
}

export enum ProjectTypes {
    SVN = 'Svn',
    GIT = 'Git'
}

export class Project extends EventEmitter implements IProject {
    private cvs:GitClient|SvnClient;
    private type:ProjectTypes;
    constructor(type:ProjectTypes,remotePath:string) {
        super();
        this.type = type;
        debug.info('project init CVS');
        debug.info('remotePath : ' + remotePath);
        debug.info('type : ' + this.type);
        switch( this.type ) {
            case 'Svn' : this.cvs = new SvnClient({
                name : 'Default',
                password : config.svnAccount.password,
                username : config.svnAccount.username,
                remotePath : remotePath,
                localPath : "unknow"
            });break;
            case 'Git' : this.cvs = new GitClient({
                name : 'Default',
                password : config.gitAccount.password,
                username : config.gitAccount.username,
                remotePath : remotePath,
                localPath : "unknow"
            });
        }
        return this;
    }
    buildLocalRep() : Promise<any> {
        const me = this;
        return new Promise((resolve,reject) => {
            if ( me.cvs.isLocalExist() ) {
                resolve();
            } else {
                me.cvs.checkout()
                  .then(function(){
                      resolve();
                  }).catch(function(error){
                      reject(error);
                  });
            }
        });
    }
    runTasks() {
        const taskConfig:any[] = [];
        const tasks:Task[] = [];
        taskConfig.forEach(function(item){
            tasks.push(
                new Task()
            )
        });
    }
}