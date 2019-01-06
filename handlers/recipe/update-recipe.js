const mongoose = require('mongoose');
const Recipe = require('../../database/models/recipe');

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

        let isCollaborator = false;

        doc.collaborators.forEach(user => {
            
            if(user.email === token_content.email 
                && user.status === 'confirmed') {
                
                isCollaborator = true;
            }
        });

        if(doc.owner.email === token_content.email || isCollaborator) {
            
            const updatedRecipe = {
                name: req.body.name,
                last_edited: {
                    date: new Date(Date.now()),
                    user: token_content.name
                },
                style: req.body.style,
                og: req.body.og,
                fg: req.body.fg,
                ibu: req.body.ibu,
                ebc: req.body.ebc,
                base_volume: parseFloat(req.body.base_volume),
                boiling_time: req.body.boiling_time,
                mash_water: parseFloat(req.body.mash_water),
                flush_water: parseFloat(req.body.flush_water),
                mash: req.body.mash,
                hops: req.body.hops.map(hop => {
                    hop.bitterness = parseFloat(hop.bitterness);
                    return hop;
                }),
                fermentables: req.body.fermentables,
                other: req.body.other,
                yeast: {
                    name: req.body.yeast.name,
                    volume: req.body.yeast.volume
                }
            }
        
            const query = Recipe.findOneAndUpdate({ _id: req.params.id }, updatedRecipe);
        
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
        } else {

            res.status(403);
            res.json({
                error: 'You are not allowed to do this operation.'
            });
        }
    });
};
