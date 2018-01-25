'use strict'

import { ClientBase, ClientTypes, IClientBase, Repository, InvokeRes } from './ClientBase'
import * as fs from 'fs'
import ExtError from '../ExtError'
import { resolve } from 'url';
import debug from '../debug'

export default class GitClient extends ClientBase implements IClientBase {
    constructor(rep:Repository) {
        super(ClientTypes.GIT);
        this.rep = rep;
    }
    isLocalExist() : boolean {
        return fs.existsSync(this.rep.localPath);
    }
    checkout():Promise<any> {
        let me = this;
        debug.info('GitClient.checkout');
        return new Promise((resolve,reject) => {
            if ( me.isLocalExist() ) {
                debug.info('GitClient.checkout isLocalExist true');
                let error = new ExtError('[GitClient] local repository is exist');
                    error.args = me.rep.remotePath;
                reject(error);
            } else {
                debug.info('GitClient.checkout isLocalExist false');
                let rep = 'http://' + me.rep.username + ':' + me.rep.password + '@' + me.rep.remotePath.replace(/(https:\/\/|http:\/\/)/,'');
                let args = [
                    'clone',
                    rep,
                    this.rep.localPath
                ];
                me.invoke(args)
                  .then((data:InvokeRes) => {
                      resolve(data);
                  }).catch((error:ExtError) => {
                      reject(error);
                  });
            }
        });
    }
    update():Promise<any> {
        let me = this;
        debug.info('GitClient.update');
        return new Promise((resolve,reject) => {
            if ( !me.isLocalExist() ) {
                debug.info('GitClient.update isLocalExist false');
                let error = new ExtError('[GitClient] local repository is not exist');
                    error.args = me.rep.localPath;
                reject(error);
            } else {
                debug.info('GitClient.update isLocalExist true');
                let args = [
                    'pull',
                    'origin', 
                    'master'
                ];
                me.invoke(args,{cwd:me.rep.localPath})
                  .then((data:InvokeRes) => {
                      resolve(data);
                  }).catch((error:ExtError) => {
                      reject(error);
                  })
            }

        });
    }
}