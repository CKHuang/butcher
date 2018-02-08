"use strict";

import * as Router from 'koa-router';
import * as Koa from 'koa';
import * as fs from 'fs';
import * as path from 'path';
import config from '../config/app';
import { isError } from 'util';

const routerRoot = config.routerRoot;

// 自动解析路由文件
function parseRouterFiles(routerRoot:string) : string[] {

    const isExist = fs.existsSync(routerRoot);
    if ( !isExist ) {
        let error = new Error('appConfig routerRoot is not exist');
        throw error;
    }
 
    const files = fs.readdirSync(routerRoot);
    let list : string[] = [];

    for ( let file in files ) {
        if ( fs.statSync( path.resolve(routerRoot,file) ).isDirectory() ) {
            let _path = path.resolve(routerRoot,file);
            list = list.concat( parseRouterFiles( _path ) );
        } else {
            list.push( path.resolve(routerRoot,file) );
        }
    }

    return list;
}

export default function(app:Koa) {
    
    let routerFiles = parseRouterFiles(routerRoot);

    if ( routerFiles.length == 0 ) {
        let error = new Error('no any router');
        throw error;
    }

    try {
        routerFiles.forEach((file) => {
            let UserRouter = require(file);
            let router = new UserRouter();
            app.use(router.routes());
        });
    } catch ( err ) {
        throw err;
    }
}