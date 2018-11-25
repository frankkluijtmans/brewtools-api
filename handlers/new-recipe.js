const mongoose = require('mongoose');
const Cat = require('../database/models/cat');

mongoose.connect(process.env.DATABASE_URL);

module.exports = (req, res) => {

    const kitty = new Cat({ name: req.body.name });
    kitty.save().then(res.sendStatus(200));
};