import * as http from 'http';
import config from '../config/app'
import * as domain from 'domain'
import handler from './handler'

const server = http.createServer((req:http.IncomingMessage,res:http.ServerResponse) => {
    let d = domain.create();
    d.on('error', (error) => {
        console.error('error',error);
    });
    d.add(req);
    d.add(res);
    d.run(() => {
        handler(req,res);
    });
});
server.listen(config.proxyHost,config.proxyPort);

export default server;