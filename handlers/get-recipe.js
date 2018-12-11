const mongoose = require('mongoose');
const Recipe = require('../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {

    const query = Recipe.findById(req.params.id);

    query.exec(function (err, docs) {

        if(err) {

            rest.status(503);
        }
        
        res.json(docs);
    });
};