const mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({ 
    name: 'string',
    style: 'string',
    brewery: 'number', 
    collaborators: ['string'],
    og: 'number',
    fg: 'number',
    ibu: 'number',
    base_volume: 'number'
});