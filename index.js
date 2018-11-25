require('dotenv').config()

const express = require('express');
const app = express();
const session = require('express-session');
const keycloakConfig = require('./config/keycloak');
const Keycloak = require('keycloak-connect');
const bodyParser = require('body-parser');

//Middleware
const acceptOptions = require('./middleware/accept-options');

//Handlers
const newRecipeHandler = require('./handlers/new-recipe');
const testHandler = require('./handlers/test-handler');

//Keycloak
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(acceptOptions);
app.use(keycloak.middleware());

//Endpoints
app.get('/', keycloak.protect(), testHandler);
app.post('/insert', keycloak.protect(), newRecipeHandler);

app.listen(3000, () => console.log('Example app listening on port 3000!'));