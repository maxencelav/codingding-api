// Run backend server
const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require('express-session');
require("dotenv").config();

// Create Express app
const app = express()

// CORS
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "Authorization");
    res.header("Access-Control-Allow-Credentials", false);

    next();
  });

// Launch cookie-parser
app.use(cookieParser())	

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Listen for request
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log("Server running on port " + port);
});

const config = require("./config/env.config.js");
const mongoose = require("mongoose");
 
// DB Connection
console.log('process.env.mongo: ' + process.env.PORT)
mongoose.connect(config.mongoURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}).then(() => {
    console.log('Database connection successful')
}).catch(err => {
    console.error('Database connection error', err);
    process.exit();
})


// Initialize Passport w/ Google Login
const passport = require("passport");
const {isLoggedIn} = require('./backend/middlewares/middleware');
const User = require('./backend/models/users.model.js');

app.use(session({
    secret: '5om35ecr37',
    cookie: {},
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
require('./config/passportSetup');
require('./backend/routes/google.routes.js')(app);

passport.serializeUser((user, done) => {
    console.log("serializing " + user.id)
    done(null, user);
});


// Import routes
require('./backend/routes/users.routes.js')(app);
require('./backend/routes/achievements.routes.js')(app);
require('./backend/routes/wishs.routes.js')(app);
require('./backend/routes/comments.routes.js')(app);
require('./backend/routes/scrumboard.routes.js')(app);
require('./backend/routes/tasks.routes.js')(app);
require('./backend/routes/agenda.routes.js')(app);

// Welcome message
app.get('/', function (req, res) {
    //res.send(`Welcome ${req.user.firstName}!`)
    res.send(`Codingding API`)
})


passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        console.log("deserializing " + user)
        done(null, user);
    });
});