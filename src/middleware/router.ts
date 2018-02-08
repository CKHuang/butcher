"use strict";

import * as Router from 'koa-router';
import * as Koa from 'koa';
import * as fs from 'fs';
import * as path from 'path';
import config from '../config/app';
import { isError } from 'util';
import { Logger, LoggerLevel } from '../utils/Logger'

interface IRouterFile {
    path:string,
    name:string
}

const routerRoot = config.routerRoot;

// 自动解析路由文件
function parseRouterFiles(routerRoot:string) : IRouterFile[] {

    const isExist = fs.existsSync(routerRoot);
    if ( !isExist ) {
        let error = new Error('appConfig routerRoot is not exist');
        throw error;
    }
 
    const files = fs.readdirSync(routerRoot);
    let list : IRouterFile[] = [];

    for ( let file of files ) {
        if ( fs.statSync( path.resolve(routerRoot,file) ).isDirectory() ) {
            let _path = path.resolve(routerRoot,file);
            list = list.concat( parseRouterFiles( _path ) );
        } else {
            list.push( { path: path.resolve(routerRoot,file), name: file } );
        }
    }

    return list;
}

export default function(app:Koa) {

    Logger.start('parseRouterFiles');
    
    let routerFiles = parseRouterFiles(routerRoot);

    Logger.end('parseRouterFiles');

    if ( routerFiles.length == 0 ) {
        let error = new Error('no any router');
        throw error;
    }

    try {
        routerFiles.forEach((routerFile) => {

            Logger.start(`LoadRouter_${routerFile.name}`)

            let UserRouter = require(routerFile.path);
            let router = new UserRouter.default();
            app.use(router.routes());

            Logger.end(`LoadRouter_${routerFile.name}`);
        });
    } catch ( err ) {
        throw err;
    }
}