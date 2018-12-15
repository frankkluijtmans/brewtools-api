const mongoose = require('mongoose');
const Recipe = require('../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {

    const token_content = req.kauth.grant.access_token.content;

    const recipeTest = new Recipe({
        name: req.body.name,
        last_edited: {
            user: token_content.email
        },
        style: req.body.style,
        owner: token_content.email,
        collaborators: [
            'frank@cmez.eu'
        ],
        og: req.body.og,
        fg: req.body.fg,
        ibu: req.body.ibu,
        ebc: req.body.ebc,
        base_volume: req.body.base_volume,
        boiling_time: req.body.boiling_time,
        mash_water: req.body.mash_water,
        flush_water: req.body.flush_water,
        mash: [
            {
                temperature: 60,
                duration: 15
            },
            {
                temperature: 65,
                duration: 60
            },
            {
                temperature: 72,
                duration: 5
            }
        ],
        hops: req.body.hops,
        fermentables: req.body.fermentables,
        other: [
            {
                name: 'Sweetened orange peel',
                volume: 6
            },
            {
                name: 'Cilantro',
                volume: 11
            }
        ],
        yeast: {
            name: 'Safale US-05',
            volume: 20
        }
    });

    recipeTest.save().then(() => {
        
        res.status(200);
        res.json({
            success: true
        });
    });
};