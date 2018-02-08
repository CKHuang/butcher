'use strict'

import * as path from 'path'

export default {
   /**
     * 代理服务的Host
     * @string
     */
    proxyHost : '127.0.0.1',
    /**
     * 代理服务的端口
     * @string
     */
    proxyPort : 8081,

    /**
     * 路由的跟目录
     * @string
     */
    routerRoot : path.join(__dirname,'../module/router'),
    /**
     * 本地克隆项目的存放路径
     * @string
     */
    localProjsPath : path.join(__dirname,'../projs'),
    /**
     * 默认的git账号和密码
     * @object{username,password}
     */
    gitAccount : {
        username : 'HelloWorld',
        password : 'hello123'
    },
    /**
     * 默认的svn账号和密码
     * @object{username,password}
     */
    svnAccount : {
        username : 'HelloWorld',
        password : 'hello123'
    }
}