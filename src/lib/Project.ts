'use strict'

import * as EventEmitter from 'events'
import GitClient from './cvs/GitClient';
import SvnClient from './cvs/SvnClient';

interface IProject {
    
}

export enum ProjectTypes {
    SVN = 'SVN',
    GIT = 'GIT'
}

export class Project extends EventEmitter implements IProject {
    private cvs:GitClient|SvnClient;
    private type:ProjectTypes;
    constructor(type:ProjectTypes) {
        super();
        this.type = type;
        return this;
    }
    
}