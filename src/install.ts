'use strict';

/**
 * 项目安装文件
 * 执行 : node ./install
 */
import config from './config/app'
//import debug from './lib/debug'
import * as fs from 'fs'

class Install {
    constructor() {}
    run() {
        this.buildProjsFolder();
        this.checkCvs();
    }
    buildProjsFolder() {
        const localProjsPath = config.localProjsPath;
        if ( !fs.existsSync(localProjsPath) ) {
            //debug.info('[Install] buildProjsFolder localProjsPath : '+localProjsPath+' is not exists');
        }
    }
    checkCvs() {

    }
}

let install = new Install();
    install.run();