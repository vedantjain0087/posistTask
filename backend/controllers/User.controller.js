const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create and Save a new Car
exports.create = (req, res, next) => {
    userModel.create({
        username: req.body.username,
        email: req.body.email,
        region: req.body.region,
        password: req.body.password
    }, function (err, result) {
        if (err)
            res.status(400).json({
                status: "error",
                message: "User Was not added",
                data: err
            });
        else
            res.status(200).json({
                status: "success",
                message: "User added successfully!!!",
                data: result
            });
    });
};