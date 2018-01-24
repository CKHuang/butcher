import { ClientBase, IClientBase, Repository, ClientTypes } from "./ClientBase";

'use strict'

export default class SvnClient extends ClientBase implements IClientBase {
    constructor(rep:Repository) {
        super(ClientTypes.SVN);
        this.rep = rep;
    }
    isLocalExist():boolean {

    }
    checkout():Promise<any> {
        let me = this;
    }
}