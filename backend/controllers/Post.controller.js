const postModel = require('../models/post');
var ObjectId = require('mongodb').ObjectID;

// Create a new channel
exports.create = (req, res, next) => {
    postModel.create({
        uid: req.body.uid,
        ref_id:ObjectId(req.body.uid),
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

exports.retrieve = (req, res, next) => {
    postModel.aggregate([{
            "$match": {
                channel_id: req.body.channel_id
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "ref_id",
                foreignField: "_id",
                as: "matched_docs"
            }
        }
    ], function (err, data) {
        if(err){
            res.status(400).json({
                status: "error",
                message: "Some Error Occured",
                data: err
            });
        }else{
            res.status(200).json({
                status: "success",
                data: data
            });
           
        }
    })




    // postModel.find({

    //     })
    //     .then(posts => {
    //         res.status(200).json({
    //             status: "success",
    //             data: posts
    //         });
    //     }).catch(err => {
    //         res.status(400).json({
    //             status: "error",
    //             message: "Some Error Occured",
    //             data: err
    //         });
    //     });
}