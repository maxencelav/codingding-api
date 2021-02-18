// Run backend server
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require('express-session');


// Create Express app
const app = express();

// Launch cookie-parser
app.use(cookieParser())	

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Listen for request
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server running on port " + port);
});

const config = require("./config/env.config.js");
const mongoose = require("mongoose");
 
// DB Connection
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
app.get('/', isLoggedIn, function (req, res) {
    res.send(`Welcome ${req.user.firstName}!`)
})


passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        console.log("deserializing " + user)
        done(null, user);
    });
});