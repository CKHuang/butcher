'use strict'

import { ClientBase, IClientBase, Repository, ClientTypes, InvokeRes } from "./ClientBase";
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
        debug.info('SvnClient.checkout');
        return new Promise((resolve,reject) => {
            if ( me.isLocalExist() ) {
                let error = new ExtError('[SvnClient.checkout] isLocalExist true');
                    error.args = me.rep.remotePath;
                reject(error);
            } else {
                debug.info('[SvnClient.checkout isLocalExist false]');
                let args = [
                    'co',
                    me.rep.remotePath,
                    me.rep.localPath,
                    '--username',
                    me.rep.username,
                    '--password',
                    me.rep.password
                ];
                me.invoke(args)
                  .then((data:InvokeRes) => {
                      resolve(data);
                  }).catch((error:ExtError) => {
                      reject(error);
                  })
            }
        });
    }
    update():Promise<any> {
        let me = this;
        return new Promise((resolve,reject) => {

        });
    }
}