const mongoose = require('mongoose');
const Recipe = require('../../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {
    
    // Delete the collaborators and owner to prevent tinkering
    delete req.body.collaborators;
    delete req.body.owner;
    
    const query = Recipe.findOneAndUpdate({ _id: req.params.id }, req.body);

    query.exec(function (err) {

        if(err) {

            res.status(503);
            res.json({
                error: 'Data mutation error.'
            });
        }

        res.status(200);
        res.json({
            success: true
        });
    });
};
