const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({ 
    name: 'string',
    style: 'string',
    brewery: 'number', 
    collaborators: ['string'],
    og: 'number',
    fg: 'number',
    ibu: 'number',
    base_volume: 'number'
});

module.exports = mongoose.model('Recipe', recipeSchema);