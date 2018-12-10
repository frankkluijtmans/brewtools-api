const mongoose = require('mongoose');
const Recipe = require('../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {

    const query = Recipe.find();

    query.exec(function (err, docs) {

        res.json(docs);
    });
};