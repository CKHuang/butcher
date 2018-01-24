import { ClientBase, ClientTypes, IClientBase } from './ClientBase'

export default class GitClient extends ClientBase implements IClientBase {
    constructor() {
        super(ClientTypes.GIT)
    }
    checkout() {
        
    }
    update() {

    }
}