const express = require('express')
const app = express()
var session = require('express-session');
var Keycloak = require('keycloak-connect');

let kcConfig = {
    clientId: 'brewtools-api-dev',
    bearerOnly: true,
    serverUrl: 'https://id.brewtools.org/auth',
    realm: 'Brewtools',
    realmPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv5Y8v4RZBJGD7CmXHFMXccYAAo06zA6xf5f8yMWaru0nHUrlIf2f0XiIESXu4xzPihMhinSmBgxG7DIejkLRRYbHnWhmstynwplCPFwlRFxECS9hohfNe8X8mi3JISyjJomfySonkgmZEKykhS0ThPIrSnc0Dz18S5gOM7OtrU5HqUw4L4gbZtSnTC670bycSTv+VPwXHACesDLLXb+SWGk8ic11/N0SKkTI8T2UI7VnGm/0c4C5fzV9g4BiM1aM5hoFJi0y5zeddBcvycztdBcNz7pN4g/2sJ+E1BC5OiWVRTEG+jNHjirWhVFNFbkFW31ChsU/8serl5ajy5OKzQIDAQAB'
}

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore }, kcConfig);

app.use(function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    }
    else {

        if(typeof req.headers.authorization === "undefined") {
            
            res.sendStatus(403);
        } else {
            
            next();
        }
    }
});

app.use( keycloak.middleware() );

app.get('/', keycloak.protect(), (req, res) => {

    res.json({
        test: "frankk"
    })
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))