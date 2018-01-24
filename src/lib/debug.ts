const isDebug = true;

interface InvokeInput {
    args?:any
}
interface InvokeOutput {
    res?:any
}

let _debugCache:any = {};

let debug = {
    _print(...args:any[]) {
        if ( isDebug ) {
            let color = "\x1B[37m%s\x1B39m"
            switch ( args[0] ) {
                case '[INF]' : color = "\x1B[36m%s\x1B[0m";break;
                case '[STR]' : 
                case '[END]' : color = "\x1B[35m%s\x1B[39m";break;
            }
            console.log.apply(console,[color,args]);
        }
    },
    info(...args:any[]) {
        this._print('[INF]',args);
    },
    start(action:string,ext?:InvokeInput) {
        let args = ext && ext.args ? JSON.stringify(ext.args) : "";
        this._print('[STR]','Act:'+action,'Args:'+args);
        _debugCache[action] = Date.now();
    },
    end(action:string,ext?:InvokeOutput) {
        let res = ext && ext.res ? JSON.stringify(ext.res) : "";
        let ws = 0;
        if ( _debugCache[action] ) {
            ws = Date.now() - _debugCache[action];
            delete _debugCache[action];
        }
        this._print('[END]','Act:'+action,'Res:'+res,'Use:'+ws+'ms');
    }
}

export default debug;