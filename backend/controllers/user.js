const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        user.save().then((result) => {
            res.status(201).json({
                message: 'User created successfully!',
                user: result
            });
        });
    }).catch((err) => {
        res.status(500).json({
            error: err
        });
    });
}