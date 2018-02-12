"use strict";

import * as nut from '../nut'
import appConfig from './config/app'

const app = new nut.Application();

app.on('error', (err:Error) => {

});

app.listen(appConfig.appPort, () => {
    
});





