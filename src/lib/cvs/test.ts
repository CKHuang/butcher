import GitClient from './GitClient'

let rep = {
    name: 'hook',
    username : 'xxxxx',
    password : 'xxxx',
    remotePath : 'xxx',
    localPath : "xxxx"
}

let git = new GitClient(rep);
    git.checkout()
       .then(() => {
            console.log('[Checkout done]');
       }).catch((error) => {
            console.log('[Checkout fail]',error);
       });
    // git.update()
    //    .then((data) => {
    //        console.log('[Update done]',data)
    //    }).catch((error) => {
    //        console.log('[Update fail]',error);
    //    })
