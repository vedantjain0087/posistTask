const jwt = require('jsonwebtoken');

module.exports = (app) => {
    const User = require('../controllers/User.controller.js');

    // Create a new Login
    app.post('/Register', User.create);
    app.post('/Login', User.authenticate);
}