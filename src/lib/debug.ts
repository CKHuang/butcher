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
                case '[IVK]' :
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
        //this._print('[STR]','Act:'+action,'Args:'+args);
        _debugCache[action] = {
            sExt:ext,
            st:Date.now()
        };
    },
    end(action:string,ext?:InvokeOutput) {
        let res = ext && ext.res ? JSON.stringify(ext.res) : "";
        let args = "";
        let ws = 0;
        if ( _debugCache[action] ) {
            let sta = _debugCache[action];
            ws = Date.now() - sta.st;
            args = sta.sExt && sta.sExt.args ? JSON.stringify(sta.sExt.args) : "";
            delete _debugCache[action];
        }
        this._print('[IVK]','Act:'+action,'Args:'+args,'Res:'+res,'Use:'+ws+'ms');
    }
}

export default debug;