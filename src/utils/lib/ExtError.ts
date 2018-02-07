export default class ExtError {
    private _error:Error;
    private _args:any;
    private _code:number;
    constructor(e:Error|string) {
        this.error = e;
    }
    get error() {
        return this._error;
    }
    set error(e:Error|string) {
        if ( e instanceof Error ) {
            this._error = e;
        } else {
            this._error = new Error(e);
        }
    }
    get args() {
        return this._args;
    }
    set args(mixed:any) {
        this._args = mixed;
    }

    get code() {
        return this._code;
    }
    set code(code:number) {
        this._code = code;
    }
}