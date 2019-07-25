import auth0 from 'auth0-js'

export const authService = {
    login,
    signup,
    changePassword
};
const AUTH0_REALM = 'Username-Password-Authentication';
function initWebAuth () {
    var params = {
        domain: window['auth0Config'].auth0Domain,//removeProtocol(window['auth0Config'].authorizationServer.url),
        clientID: window['auth0Config'].clientID,
        redirectUri: window['auth0Config'].callbackURL,
        audience: window['auth0Config'].audience,
        responseType: window['auth0Config'].extraParams.response_type,
        // overrides: {
        //     __tenant: window['auth0Config'].auth0Tenant,
        //     __token_issuer: window['auth0Config'].authorizationServer.issuer
        // },
        ...window['auth0Config'].internalOptions,
    };

    return new auth0.WebAuth(params);      
}
      
function login (username, password) {
    console.log(auth0Config); 
    return new Promise((resolve, reject) => {
        try {
            initWebAuth().login({
                realm: AUTH0_REALM,
                username: username,
                password: password
            }, err => {
                console.log(err);
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });       
}

function signup(options) {
    return new Promise((resolve, reject) => {
        try {
            options.connection = AUTH0_REALM;
            initWebAuth().signup(options, err => {
                console.log(err);
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });     
}

function changePassword(options) {
    return new Promise((resolve, reject) => {
        try {
            options.connection = AUTH0_REALM;
            initWebAuth().changePassword(options, (err, resp) => {
                console.log(err);
                if (err) {
                    reject(err);
                } else {
                    console.log(resp);
                    resolve(resp);
                }
            });
        } catch (e) {
            console.log(e);
            reject(e);
        }
    });     
}