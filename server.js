const express = require('express')
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
var morgan = require('morgan');
const app = express();
app.set('secretKey', 'nodeRestApi');
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
const dbConfig = require('./backend/config/config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// configuration =================

app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json

// listen (start app with node server.js) ======================================
app.get('/', (req, res) => {
    res.json({
        "message": "Welcome to Posist Task"
    });
});

require('./backend/routes/UserRoute.js')(app);


app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});