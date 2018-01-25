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
     * 本地克隆项目的存放路径
     * @string
     */
    localProjsPath : path.join(__dirname,'../projs')
}