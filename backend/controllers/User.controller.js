const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Create a new user
exports.create = (req, res, next) => {
    userModel.create({
        username: req.body.username,
        email: req.body.email,
        region: req.body.region,
        password: req.body.password
    }, function (err, result) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: "User Was not added",
                data: err
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "User added successfully!!!",
                data: result
            });
        }

    });
};

exports.authenticate = (req, res, next) => {
    userModel.findOne({
        username: req.body.username
    }, function (err, userInfo) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: "Invalid Login",
                data: err
            });
        } else {
            if (userInfo == null) {
                res.status(400).json({
                    status: "error",
                    message: "Invalid Username",
                    data: null
                });
                return;
            }
            if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({
                    id: userInfo._id
                }, req.app.get('secretKey'), {
                    expiresIn: '1h'
                });
                res.status(200).json({
                    status: "success",
                    message: "user found!!!",
                    data: {
                        user: userInfo,
                        token: token
                    }
                });
            } else {
                res.status(400).json({
                    status: "error",
                    message: "Invalid password!!!",
                    data: null
                });
            }
        }
    });
}

exports.trendingRegion = (req, res, next) =>{
    userModel.aggregate([{
        $group: {
            _id: "$region",
            count: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            'count': -1
        }
    },
    { $limit : 5 }
], function (err, result) {
    if (err) {
        res.status(400).json({
            status: "error",
            message: "Some Error Occured",
            data: err
        });
    } else {
        res.status(200).json({
            status: "success",
            message: "Success",
            data: result
        });
    }
})
}