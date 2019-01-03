const mongoose = require('mongoose');
const Recipe = require('../../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {
    
    const token_content = req.kauth.grant.access_token.content;
        
    const query = Recipe.findOneAndUpdate(
        { 
            _id: req.params.id 
        },   
        { 
            $pull: {
                collaborators: {
                    email: token_content.email
                }
            }
        }
    );

    query.exec(function () {

        res.status(200);
        res.json({
            success: true
        });
    });
};