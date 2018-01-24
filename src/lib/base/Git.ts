import { CvsClient, CvsClientTypes, ICvsClient } from './CvsClient'

export default class Git extends CvsClient implements ICvsClient {
    constructor() {
        super(CvsClientTypes.GIT);
    }
    checkout() {

    }
    update() {

    }
}