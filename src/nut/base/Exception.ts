"use strict";

export class Exception {
    /**
     * error object
     */
    private _error : Error;
    /**
     * variables thar trigger an exception
     */
    private _variables : any = null;
    /**
     * instead of Error,for more message
     * @param message {string|Error}
     * @example
     *      
     *      let exception = new Exception('error messge');
     *   OR let exception = new Exception(new Error('error message'));
     * 
     */
    constructor( message : string | Error , variables? : any ) {
        if ( message instanceof Error ) {
            this._error = message;
        } else {
            this._error = new Error(message);
        }
        if ( variables ) {
            this._variables = variables;
        }
    }

    /**
     * return all variables
     * @return variables {null|any}
     */
    variables() {
        return this._variables;
    }

    /**
     * return full error object
     * @return error {Error}
     */
    error() {
        return this._error;
    }

    /**
     * return error message
     * @return message {string}
     */
    message() {
        return this._error.message;
    }

    /**
     * return error stack
     */
    stack() {
        return this._error.stack;
    }

    /**
     * @TODO 
     * output exception info to a string
     * @param format {string} output rule
     * @example
     *      
     *      exception.toString('message:{message},variables:{variables},stack:{stack}');
     *          variables and stack will be output before JSON.stringify
     */
    toString(format:string) {
        let text = "";
        
    }
}