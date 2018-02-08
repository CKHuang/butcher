"use strict";

import * as Koa from 'koa';
import * as Router from 'koa-router';
import appConfig from './config/app';
import { Logger, LoggerLevel } from './utils/Logger';
import init from './init/init'
import router from './middleware/router';

init();

const app:Koa = new Koa();

router(app);

app.on('error', (err:Error, ctx:Koa.Context) => {
    Logger.error(LoggerLevel.SYS,err);
});

app.listen(appConfig.proxyPort, () => {
    Logger.info(LoggerLevel.SYS,`server run at ${appConfig.proxyPort}`);
});