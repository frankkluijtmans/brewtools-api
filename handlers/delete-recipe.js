const mongoose = require('mongoose');
const Recipe = require('../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {

    const query = Recipe.findByIdAndDelete(req.params.id);

    query.exec(function () {

        res.status(200);
    });
};