import GitClient from './GitClient'
import SvnClient from './SvnClient'
import * as path from 'path'

let rep = require('../../../config');

// let git = new GitClient(rep);
//     git.checkout()
//        .then(() => {
//             console.log('[Checkout done]');
//        }).catch((error) => {
//             console.log('[Checkout fail]',error);
//        });
//     git.update()
//        .then((data) => {
//            console.log('[Update done]',data)
//        }).catch((error) => {
//            console.log('[Update fail]',error);
//        })
let svn = new SvnClient(rep.svn);
    svn.checkout()
       .then(() => {
           console.log('[Checkout done]');
       }).catch((error) => {
           console.log('[Checkout fail]',error);
       })
