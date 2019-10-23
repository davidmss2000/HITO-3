// Import express and body-parser
const express = require('express');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//app.P

// simplest route
app.get('/', (req, res) => res.json({"Hello":"World"}));

require('./routes/user.routes.js')(app);

// Listen for requests
app.listen(80, () => {
    console.log("Server listening on port 80");
});