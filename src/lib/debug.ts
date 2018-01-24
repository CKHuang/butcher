const isDebug = true;

export default function debug(...args:any[]) {
    if ( isDebug ) {
        console.log('[DEBUG]',...args);
    }
}