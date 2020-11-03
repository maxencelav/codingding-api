// Run backend server
const express = require("express");
const bodyParser = require("body-parser");

// Create Express app
const app = express();


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

const dbConfig = require("./config/database.config.js");
const mongoose = require("mongoose");

mongoose.connect(dbConfig.url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log('Database connection successful')
}).catch(err => {
    console.error('Database connection error', err);
    process.exit();
})

// Welcome message
app.get('/', function (req, res) {
    res.json({"msg": "Codingding API"});
})

// Import routes
require('./backend/routes/users.routes.js')(app);
require('./backend/routes/achievements.routes.js')(app);
require('./backend/routes/wishs.routes.js')(app);
require('./backend/routes/comments.routes.js')(app);
require('./backend/routes/scrumboard.routes.js')(app);
require('./backend/routes/tasks.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
