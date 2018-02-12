"use strict"

import * as fs from 'fs'
import * as path from 'path'
import { Application } from '../../base/Application'
import { Exception } from '../../base/Exception'

/**
 * @example
 * IRouterConfig {
 *     root :  '/path/to/modules/app/router'
 * }
 * IRouterConfig {
 *     root : [
 *          '/path/to/modules/api/router'
 *          '/path/to/modules/admin/router'
 *     ]
 * }
 * IRouterConfig {
 *      root : [
 *          '/path/to/modules/api/router'
 *          '/path/to/modules/admin/router'        
 *      ],
 *      suffix : 'Router'
 * }
 */
export interface IRouterConfig {
    root : string | string[],
    suffix? : string
    prefix? : string
}

export function router(app:Application,config:IRouterConfig) : void {
    
    let roots = config.root instanceof Array ? config.root : [config.root];
    let suffix = config.suffix ? config.suffix : null;
    let prefix = config.prefix ? config.prefix : null;

    roots.forEach((root) => {
        let routerFiles = parseRouterFiles(root,prefix,suffix);
        useRouter(app,routerFiles);
    });
}

interface IRouterFile {
    path : string,
    name : string
}

function useRouter(app:Application,routerFiles:IRouterFile[]) {
    try {
        routerFiles.forEach((routerFile) => {
            let Router = require(routerFile.path);
            let router = new Router.default();
            app.use(router.routes());
            app.use(router.allowMethods());
        });
    } catch ( err ) {
        throw new Exception(err);
    }
}

/**
 * determine whether the prefix and suffix of a file are in conformity with the rules
 * @param filename filenmae
 * @param prefix  prefix
 * @param suffix  suffix
 */
function isMatchFile( filename:string, prefix:string|null, suffix:string|null ) : boolean {
    if ( !prefix && !suffix ) {
        return true;
    }
    if ( prefix && filename.indexOf(prefix) !== 0 ) {
        return false;
    }
    if ( suffix && filename.lastIndexOf(suffix) !== (filename.length - suffix.length) ) {
        return false;
    }
    return true;
}

/**
 * automatically parse routerRoot every directory has router files
 * @param routerRoot path to routers file
 * @param prefix filename prefix
 * @param suffix filename suffix
 */
function parseRouterFiles(routerRoot:string, prefix:string|null, suffix:string|null) : IRouterFile[] {
    
    const isExist = fs.existsSync(routerRoot);

    if ( isExist ) {
        throw new Exception(
            `${routerRoot} is not exist`
        );
    }

    const files = fs.readdirSync(routerRoot);
    let list : IRouterFile[] = [];

    for ( let file of files ) {
        if ( fs.statSync( path.resolve(routerRoot,file) ).isDirectory() ) {
            let _path = path.resolve(routerRoot,file);
            list = list.concat( parseRouterFiles(_path,prefix,suffix) );
        } else if ( isMatchFile(file,prefix,suffix) ) {
            list.push( {path:path.resolve(routerRoot,file),name:file} );
        }
    }

    return list;
}
