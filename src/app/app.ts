"use strict";

import * as nut from '../nut'
import appConfig from './config/app'
import routerConfig from './config/router'
import { router, IRouterConfig } from '../nut/middleware/router'
import * as views from 'koa-views'
import * as path from 'path'

const app = new nut.Application();

router(app,routerConfig);

app.use(views(path.resolve(__dirname,'./modules/admin/view'), {
    map : {
        html : 'ejs'
    }
}))

app.on('error', (err:Error) => {
    
});

app.listen(appConfig.appPort, () => {
    console.log(`server run at ${appConfig.appPort}`);
});





