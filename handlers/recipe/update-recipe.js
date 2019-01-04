const mongoose = require('mongoose');
const Recipe = require('../../database/models/recipe');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {
    
    const updatedRecipe = {
        name: req.body.name,
        last_edited: {
            date: new Date(Date.now())
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
};
