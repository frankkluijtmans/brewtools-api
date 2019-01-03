const mongoose = require('mongoose');
const Recipe = require('../../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {

    const token_content = req.kauth.grant.access_token.content;
    console.log(token_content);

    const recipeTest = new Recipe({
        name: req.body.name,
        last_edited: {
            user: token_content.email
        },
        style: req.body.style,
        owner: {
            email: token_content.email,
            fullname: token_content.name
        },
        collaborators: [],
        og: req.body.og,
        fg: req.body.fg,
        ibu: req.body.ibu,
        ebc: req.body.ebc,
        base_volume: req.body.base_volume,
        boiling_time: req.body.boiling_time,
        mash_water: req.body.mash_water,
        flush_water: req.body.flush_water,
        mash: req.body.mash,
        hops: req.body.hops,
        fermentables: req.body.fermentables,
        other: req.body.other,
        yeast: {
            name: req.body.yeast.name,
            volume: req.body.yeast.volume
        }
    });

    recipeTest.save().then(() => {
        
        res.status(200);
        res.json({
            success: true
        });
    });
};