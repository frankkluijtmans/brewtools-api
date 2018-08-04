require('dotenv').config()

const express = require('express')
const app = express()
const session = require('express-session');
const keycloakConfig = require('./config/keycloak');
const Keycloak = require('keycloak-connect');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const Cat = mongoose.model('Cat', { name: String });

var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

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

app.post('/insert', (req, res) => {

    const kitty = new Cat({ name: 'Purr' });
    kitty.save().then(res.sendStatus(200));
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))