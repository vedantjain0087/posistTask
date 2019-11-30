const mongoose = require("mongoose");
require('mongoose-type-email');


const channelSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    tags: {
        type: Array,
    },
    users: {
        type: Array
    },
}, {
    timestamps: true
});


module.exports = mongoose.model("channel", channelSchema);