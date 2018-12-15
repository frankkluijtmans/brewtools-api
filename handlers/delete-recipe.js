const mongoose = require('mongoose');
const Recipe = require('../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {

    const token_content = req.kauth.grant.access_token.content;

    Recipe.findById(req.params.id, (err, doc) => {

        if(err) {

            res.status(503);
            res.json({
                error: 'Data retrieval error.'
            });
        }

        if(doc.owner === token_content.email) {
            
            Recipe.findByIdAndDelete(req.params.id, (err) => {
    
                if(err) {
        
                    res.status(503);
                    res.json({
                        error: 'Data retrieval error.'
                    });
                }
        
                res.json({
                    success: true
                });
            });
        } else {

            res.status(403);
            res.json({
                error: 'You are not allowed to do this operation.'
            });
        }
    });
};