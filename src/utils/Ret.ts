interface IRet {
    ret    : number,
    msg    : string,
    data?  : any | null,
    error? : Error | null 
}

export default class Ret {
    constructor() {

    }
}