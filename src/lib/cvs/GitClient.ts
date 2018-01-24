'use strict'

import { ClientBase, ClientTypes, IClientBase, Repository, InvokeRes } from './ClientBase'
import * as fs from 'fs'
import ExtError from '../ExtError'
import { resolve } from 'url';
import debug from '../debug'

export default class GitClient extends ClientBase implements IClientBase {
    private rep:Repository
    constructor(rep:Repository) {
        super(ClientTypes.GIT);
        this.rep = rep;
    }
    isLocalExist():boolean {
        return fs.existsSync(this.rep.localPath);
    }
    checkout():Promise<any> {
        let me = this;
        debug('GitClient checkout');
        return new Promise((resolve,reject) => {
            if ( me.isLocalExist() ) {
                debug('GitClient isLocalExist true');
                let error = new ExtError('[GitClient] local repository is Exits');
                    error.args = this.rep.remotePath;
                reject(error);
            } else {
                debug('GitClient isLocalExist false');
                let rep = 'http://' + me.rep.username + ':' + me.rep.password + '@' + me.rep.remotePath.replace(/(https:\/\/|http:\/\/)/,'');
                let args = [
                    'clone',
                    rep
                ];
                debug('ClientBase invoke : ',JSON.stringify(args));
                me.invoke(args)
                  .then(function(data:InvokeRes){
                      debug('ClientBase invoke success : ',JSON.stringify(data));
                      resolve();
                  }).catch(function(error:ExtError){
                     debug('ClientBase invoke fail : ',JSON.stringify(error));
                      reject(error);
                  });
            }
        });
    }
    update():Promise<any> {
        let me = this;
        return new Promise((resolve,reject) => {

        });
    }
}