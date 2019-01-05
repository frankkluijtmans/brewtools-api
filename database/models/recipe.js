const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose, 2);

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
    owner: {
        email: String,
        fullname: String
    },
    collaborators: [{
        email: String,
        fullname: String,
        status: String
    }],
    og: Number,
    fg: Number,
    ibu: Number,
    ebc: Number,
    base_volume: Float,
    boiling_time: Number,
    mash_water: Float,
    flush_water: Float,
    mash: [{
        temperature: Number,
        duration: Number
    }],
    hops: [{
        name: String,
        bitterness: Float,
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
        volume: Number,
        usage: {
            amount: Number,
            unit: String
        }
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