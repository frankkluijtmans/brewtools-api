const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({ 
    name: String,
    created: { 
        type: Date, 
        default: Date.now 
    },
    last_edited: {
        date: { 
            type: Date, 
            default: Date.now 
        },
        user: String
    },
    style: String,
    owner: String,
    collaborators: [String],
    og: Number,
    fg: Number,
    ibu: Number,
    ebc: Number,
    base_volume: 'decimal128',
    boiling_time: Number,
    mash_water: 'decimal128',
    flush_water: 'decimal128',
    mash: [{
        temperature: Number,
        duration: Number
    }],
    hops: [{
        name: String,
        bitterness: 'decimal128',
        volume: Number,
        usage: {
            amount: Number,
            unit: String
        }
    }],
    fermentables: [{
        name: String,
        color: Number,
        volume: Number
    }],
    other: [{
        name: String,
        volume: Number
    }],
    yeast: {
        name: String,
        volume: {
            amount: Number,
            unit: String
        }
    }
});

module.exports = mongoose.model('Recipe', recipeSchema);