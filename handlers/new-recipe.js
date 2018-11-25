const mongoose = require('mongoose');
const Recipe = require('../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {
    console.log(req.body.name);
    const recipeTest = new Recipe({
        name: 'Tripple Nipple',
        style: 'Belgian Triple',
        collaborators: ['frank_kluyt@hotmail.com'],
        og: 1057,
        fg: 1012,
        ibu: 21,
        ebc: 20,
        base_volume: 10,
        boiling_time: 90,
        mash_water: 25,
        flush_water: 10,
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