'use strict'

import { ClientBase, ClientTypes, IClientBase, Repository, InvokeRes } from './ClientBase'
import * as fs from 'fs'
import ExtError from '../ExtError'
import { resolve } from 'url';
import { Logger } from '../../Logger'

export default class GitClient extends ClientBase implements IClientBase {
    constructor(rep:Repository) {
        super(ClientTypes.GIT);
        this.rep = rep;
    }
    isLocalExist() : boolean {
        return fs.existsSync(this.rep.localPath);
    }
    checkout():Promise<any> {
        Logger.info('GitClient.checkout');
        let rep = 'http://' + this.rep.username + ':' + this.rep.password + '@' + this.rep.remotePath.replace(/(https:\/\/|http:\/\/)/,'');
        return this.invoke([
            'clone',
            rep,
            this.rep.localPath
        ]);
    }
    update():Promise<any> {
        Logger.info('GitClient.update');
        return this.invoke([
            'pull',
            'origin', 
            'master' 
        ])
    }
}