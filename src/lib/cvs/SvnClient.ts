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
        return new Promise((resolve,reject) => {
            debug.info('SvnClient.checkout');
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
        });
    }
    update():Promise<any> {
        let me = this;
        return new Promise((resolve,reject) => {
            debug.info('SvnClient.update');
            let args = [
                'update',
                '--username',
                me.rep.username,
                '--password',
                me.rep.password
            ];
            me.invoke(args,{cwd:me.rep.localPath})
              .then((data:InvokeRes) => {
                  resolve(data);
              }).catch((error:ExtError) => {
                  reject(error);
              });
        });
    }
}