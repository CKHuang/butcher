"use strict";

import * as Koa from 'koa';
import * as Router from 'koa-router';
import appConfig from './config/app';
import { logger, LOG_TYPES } from './utils/logger';
import router from './middleware/router';

const app:Koa = new Koa();

router(app);

app.on('error', (err:Error, ctx:Koa.Context) => {
    logger.error(err);
});

app.listen(appConfig.proxyPort, () => {
    logger.info(LOG_TYPES.Sys,`server run at ${appConfig.proxyPort}`);
});