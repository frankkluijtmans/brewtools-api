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
        hops: [
            {
                name: 'Centennial',
                bitterness: 11.2,
                volume: 45,
                boiling_time: 90
            },
            {
                name: 'Cascade',
                bitterness: 8.6,
                volume: 18,
                boiling_time: 30
            }
        ],
        grains: [
            {
                name: 'Pilsener',
                color: 8,
                volume: 600
            },
            {
                name: 'Caramunich',
                color: 120,
                volume: 80
            }
        ],
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

    recipeTest.save().then(res.sendStatus(200));
};