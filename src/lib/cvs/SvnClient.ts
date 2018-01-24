'use strict'

import { ClientBase, IClientBase, Repository, ClientTypes } from "./ClientBase";
import debug from '../debug'
import ExtError from "../ExtError";
import * as fs from 'fs'

'use strict'

export default class SvnClient extends ClientBase implements IClientBase {
    constructor(rep:Repository) {
        super(ClientTypes.SVN);
        this.rep = rep;
    }
    isLocalExist() : boolean {
        return fs.existsSync(this.rep.localPath);
    }
    checkout():Promise<any> {
        let me = this;
        return new Promise((resolve,reject) => {
            if ( me.isLocalExist() ) {
                let error = new ExtError('[SvnClient] local repository is Exits');
                    error.args = me.rep.remotePath;
                reject(error);
            } else {
               
            }
        });
    }
    update():Promise<any> {
        let me = this;
        return new Promise((resolve,reject) => {

        });
    }
}