const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({ 
    name: 'string'
});

module.exports = mongoose.model('Cat', catSchema);