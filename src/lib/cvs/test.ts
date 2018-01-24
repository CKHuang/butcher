import GitClient from './GitClient'

let rep = {
    name: 'hook',
    username : 'xxxx',
    password : 'xxxxx',
    remotePath : 'xxxx',
    localPath : "xxxx"
}

let git = new GitClient(rep);
    git.checkout()
       .then(() => {
            console.log('[Checkout done]');
       }).catch((error) => {
            console.log('[Checkout fail]',error);
       });
