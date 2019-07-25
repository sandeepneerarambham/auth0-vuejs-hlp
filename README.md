# Auth0 Vuejs

[Auth0](https://auth0.com) is an authentication broker that supports social identity providers as well as enterprise identity providers such as Active Directory, LDAP, Google Apps, Salesforce and databases.

Sample project to demostrate [auth0.js](https://github.com/auth0/auth0.js) 

* Login with database connection
* Reset Password
* Signup with first name, last name, email, password

## Running locally

To run it locally:

* Populate the auth0Config object in index.html

```bash
    window.auth0Config = {
        auth0Domain: '{tenant}.{region}.auth0.com',
        clientID: '{client_id',
        callbackURL: location.href,
        audience: 'https://{tenant}.{region}.auth0.com/userinfo',
        scope: 'openid',
        authorizationServer: {
            url: '',
            issuer: '',
        },
        extraParams: {
            response_type: 'token id_token'
        },
    }
```

```bash
$ npm start
```

## Deploy to Auth0 Universal Login Pages

1. Run `npm run build` , a dist folder will be created with `index.html, main.js` files
2. Upload the `main.js` file to a CDN, example AWS S3 Bucket
3. Add the script tag to import the `main.js` file in the `index.html`
4. Copy the contents of `index.html` into Auth0 Universal Login, Login section.

