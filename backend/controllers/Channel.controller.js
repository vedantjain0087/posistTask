const channelModel = require('../models/channel');
const userModel = require('../models/user');
var ObjectId = require('mongodb').ObjectID;

// Create a new channel
exports.create = (req, res, next) => {
    channelModel.create({
        name: req.body.name,
        description: req.body.description,
        tags: req.body.tags,
        users: [ObjectId(req.body.users)],

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
            users: ObjectId(req.body.user_id)
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
                $eq: ObjectId(req.body.user_id)
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


exports.available = (req, res, next) => {
    channelModel.find({
        "users": {
            $nin: [ObjectId(req.body.user_id)]
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


exports.channel = (req, res, next) => {
    channelModel.find({
        "_id": ObjectId(req.body.id)
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

exports.members = (req, res, next) => {
    channelModel.find({
        "_id": ObjectId(req.body.id)
    }, function (err, result) {
        if (err) {
            res.status(400).json({
                status: "error",
                message: "Some Error Occured",
                data: err
            });
        } else {
            userModel.find({
                _id: {
                    $in: result[0].users
                }
            }, function (err, data) {
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
                        data: data
                    });
                }
            });
        }
    });
}

exports.trendingChannels = (req, res, next) => {
    channelModel.aggregate([{
            $addFields: {
                subscribedGroupsLength: {
                    $size: "$users"
                }
            }
        },
        {
            $sort: {
                subscribedGroupsLength: -1
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

exports.trendingTags = (req, res, next) => {
    channelModel.aggregate([{
            $unwind: '$tags'
        },
        {
            $group: {
                _id: '$tags',
                sum: {
                    $sum: 1
                }
            }
        }, {
            $sort: {
                sum: -1
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