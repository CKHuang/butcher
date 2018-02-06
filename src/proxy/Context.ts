import * as http from 'http'

export class Context {
    request : http.IncomingMessage;
    responese : http.ServerResponse;
    constructor(request:http.IncomingMessage,response:http.ServerResponse) {
        this.request = request;
        this.responese = response;
    }
}