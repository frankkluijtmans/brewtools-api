const mongoose = require('mongoose');
const Cat = require('../database/models/cat');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {

    const query = Cat.find({ name: 'Derp'});

    query.exec(function (err, docs) {

        res.json(docs);
    });
};