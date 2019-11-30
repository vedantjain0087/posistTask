const postModel = require('../models/post');
var ObjectId = require('mongodb').ObjectID;

// Create a new channel
exports.create = (req, res, next) => {
    postModel.create({
        uid: req.body.uid,
        channel_id: req.body.channel_id,
        description: req.body.description,
    }, function (err, result) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: "Post was not created",
                data: err
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Post added successfully!!!",
                data: result
            });
        }
    });
}