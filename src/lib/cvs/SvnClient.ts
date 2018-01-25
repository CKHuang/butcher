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
        debug.info('SvnClient.checkout');
        return this.invoke([
            'co',
            this.rep.remotePath,
            this.rep.localPath,
            '--username',
            this.rep.username,
            '--password',
            this.rep.password
        ]);
    }
    update():Promise<any> {
        let me = this;
        debug.info('SvnClient.update');
        return this.invoke([
            'update',
            '--username',
            me.rep.username,
            '--password',
            me.rep.password
        ]);
    }
}