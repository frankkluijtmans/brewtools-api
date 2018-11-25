const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({ 
    name: 'string',
    style: 'string',
    collaborators: ['string'],
    og: 'number',
    fg: 'number',
    ibu: 'number',
    ebc: 'number',
    base_volume: 'number',
    boiling_time: 'number',
    mash_water: 'number',
    flush_water: 'number',
    mash: [{
        temperature: 'number',
        duration: 'number'
    }],
    hops: [{
        name: 'string',
        bitterness: 'decimal128',
        volume: 'number',
        boiling_time: 'number'
    }],
    grains: [{
        name: 'string',
        color: 'number',
        volume: 'number'
    }],
    other: [{
        name: 'string',
        volume: 'number'
    }],
    yeast: {
        name: 'string',
        volume: 'number'
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);