const mongoose = require('mongoose');
const Recipe = require('../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {
    
    const token_content = req.kauth.grant.access_token.content;
    const query = Recipe.find({ $or:[
        { owner: token_content.email },
        { collaborators: token_content.email }
    ] });

    query.exec(function (err, docs) {

        if(err) {

            res.status(503);
        }

        res.json(docs);
    });
};