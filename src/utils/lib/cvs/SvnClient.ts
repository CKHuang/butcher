'use strict'

import { ClientBase, IClientBase, Repository, ClientTypes, InvokeRes } from "./ClientBase";
import { Logger } from '../../Logger'
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
        Logger.info('SvnClient.checkout');
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
        Logger.info('SvnClient.update');
        return this.invoke([
            'update',
            '--username',
            me.rep.username,
            '--password',
            me.rep.password
        ]);
    }
}