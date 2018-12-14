const mongoose = require('mongoose');
const Recipe = require('../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {

    const query = Recipe.findOneAndUpdate({ _id: req.params.id }, req.body);

    query.exec(function () {

        res.json({
            success: true
        });
    });
};