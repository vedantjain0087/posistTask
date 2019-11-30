const mongoose = require("mongoose");
require('mongoose-type-email');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
    email: {
        type: mongoose.SchemaTypes.Email,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    region: {
        type: String,
        trim: true,
        required: true
    },
}, {
    timestamps: true
});

// hash user password before saving into database
userSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});


module.exports = mongoose.model("user", userSchema);