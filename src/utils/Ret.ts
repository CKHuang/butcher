interface IRet {
    ret    : number,
    msg    : string,
    data?  : any | null,
    error? : Error | null 
}

export class Ret {
    private version:string;
    constructor() {
        this.version = "0.2"
    }
    data() {
        console.log('->data');
    }
    json() {

    }
    html() {

    }
}