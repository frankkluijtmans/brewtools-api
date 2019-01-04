require('dotenv').config()

const express = require('express');
const app = express();
const session = require('express-session');
const keycloakConfig = require('./config/keycloak');
const Keycloak = require('keycloak-connect');
const bodyParser = require('body-parser');

//Middleware
const acceptOptions = require('./middleware/accept-options');

//Recipe handlers
const updateRecipeHandler = require('./handlers/recipe/update-recipe');
const newRecipeHandler = require('./handlers/recipe/new-recipe');
const getRecipeHandler = require('./handlers/recipe/get-recipe');
const getAllRecipesHandler = require('./handlers/recipe/get-all-recipes');
const deleteRecipeHandler = require('./handlers/recipe/delete-recipe');

//Invite handlers
const newInviteHandler = require('./handlers/invite/new-invite');
const getAllInvitesHandler = require('./handlers/invite/get-all-invites');
const accepInviteHandler = require('./handlers/invite/accept-invite');
const declineInviteHandler = require('./handlers/invite/decline-invite');

//Keycloak
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(acceptOptions);
app.use(keycloak.middleware());

//Recipe endpoints
app.post('/recipe/create', keycloak.protect(), newRecipeHandler);
app.post('/recipe/update/:id', keycloak.protect(), updateRecipeHandler);
app.get('/recipe/get/:id', keycloak.protect(), getRecipeHandler);
app.get('/recipe/get-all', keycloak.protect(), getAllRecipesHandler);
app.post('/recipe/delete/:id', keycloak.protect(), deleteRecipeHandler);

//Invite endpoints
app.post('/invite/create/:id', keycloak.protect(), newInviteHandler);
app.get('/invite/get-all', keycloak.protect(), getAllInvitesHandler);
app.get('/invite/accept/:id', keycloak.protect(), accepInviteHandler);
app.get('/invite/decline/:id', keycloak.protect(), declineInviteHandler);

if(process.env.DEVELOPMENT_MODE) {

    app.listen(3000, () => {
        console.log("Brewtools API running on port 3000");
    })
}

module.exports = app;