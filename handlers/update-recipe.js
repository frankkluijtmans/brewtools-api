const mongoose = require('mongoose');
const Recipe = require('../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {
    
    // Delete the collaborators from a recipe
    delete req.body.collaborators;
    
    const query = Recipe.findOneAndUpdate({ _id: req.params.id }, req.body);

    query.exec(function () {

        res.status(200);
        res.json({
            success: true
        });
    });
};
