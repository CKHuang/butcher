import { isDate } from "util";

"use strict";

// interface InvokeInput {
//     args?:any
// }
// interface InvokeOutput {
//     res?:any
// }

// let _loggerCache:any = {};

// export enum LOG_TYPES {
//     Sys = 'sys',
//     Web = 'web'
// }

// export class Logger {

//     static private isDebug = true;

//     static private print(...args:any[]) {

//     }
// }

// export class Logger {
//     static private print(...args:any[]) {
//         if ( isDebug ) {
//             let color = "\x1B[37m%s\x1B39m"
//             switch ( args[0] ) {
//                 case '[INF]' : color = "\x1B[36m%s\x1B[0m";break;
//                 case '[STR]' : 
//                 case '[IVK]' :
//                 case '[END]' : color = "\x1B[35m%s\x1B[39m";break;
//                 case '[ERR]' : color = "\x1B[31m%s\x1B[39m";break;
//             }
//             console.log.apply(console,[color,args]);
//         }
//     }
    // static info(...args:any[]) {
    //     this._print('[INF]',args);
    // }
    // static error(...args:any[]) {
    //     this._print('[ERR]',args);
    // }
    // static start(action:string,ext?:InvokeInput) {
    //     let args = ext && ext.args ? JSON.stringify(ext.args) : "";
    //     _loggerCache[action] = {
    //         sExt:ext,
    //         st:Date.now()
    //     };
    // }
    // static end(action:string,ext?:InvokeOutput) {
    //     let res = ext && ext.res ? JSON.stringify(ext.res) : "";
    //     let args = "";
    //     let ws = 0;
    //     if ( _loggerCache[action] ) {
    //         let sta = _loggerCache[action];
    //         ws = Date.now() - sta.st;
    //         args = sta.sExt && sta.sExt.args ? JSON.stringify(sta.sExt.args) : "";
    //         delete _loggerCache[action];
    //     }
    //     Logger._print('[IVK]','Act:'+action,'Args:'+args,'Res:'+res,'Use:'+ws+'ms');
    // }
// }