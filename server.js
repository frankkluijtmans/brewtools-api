require('dotenv').config()

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const session = require('express-session');
const keycloakConfig = require('./config/keycloak');
const Keycloak = require('keycloak-connect');
const bodyParser = require('body-parser');

//Middleware
const acceptOptions = require('./middleware/accept-options');

//Handlers
const updateRecipeHandler = require('./handlers/update-recipe');
const newRecipeHandler = require('./handlers/new-recipe');
const getRecipeHandler = require('./handlers/get-recipe');
const getAllRecipesHandler = require('./handlers/get-all-recipes');
const deleteRecipeHandler = require('./handlers/delete-recipe');

//Keycloak
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(acceptOptions);
app.use(keycloak.middleware());

//Endpoints
app.post('/recipe/create', keycloak.protect(), newRecipeHandler);
app.post('/recipe/update', keycloak.protect(), updateRecipeHandler);
app.get('/recipe/get/:id', keycloak.protect(), getRecipeHandler);
app.get('/recipe/get-all', keycloak.protect(), getAllRecipesHandler);
app.post('/recipe/delete/:id', keycloak.protect(), deleteRecipeHandler);

app.listen(port, () => console.log(`Brewtools API is running on port ${port}!`));