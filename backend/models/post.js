const mongoose = require("mongoose");
require('mongoose-type-email');


const postSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true
    },
    channel_id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("post", postSchema);