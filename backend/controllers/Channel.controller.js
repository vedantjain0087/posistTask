const channelModel = require('../models/channel');
var ObjectId = require('mongodb').ObjectID;

// Create a new channel
exports.create = (req, res, next) => {
    channelModel.create({
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
    }, function (err, result) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: "Channel was not created",
                data: err
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Channel added successfully!!!",
                data: result
            });
        }

    });
};

exports.join = (req, res, next) => {
    channelModel.update({
        _id: ObjectId(req.body.channel_id)
    }, {
        $push: {
            users: req.body.user_id
        }
    }, function (err, result) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: "User was not added",
                data: err
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "User added successfully!!!",
                data: result
            });
        }

    })
}

exports.myChannels = (req, res, next) => {
    channelModel.find({
        "users": {
            $elemMatch: {
                $eq: req.body.user_id
            }
        }
    }, function (err, result) {
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