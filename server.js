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
require('./backend/routes/agenda.routes.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

// Passport setup
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('./config/google.config');
const User = require('./backend/models/users.model.js');

passport.use(new GoogleStrategy(
    {
        clientID: keys.clientID,
        clientSecret: keys.clientSecret,
        callbackURL: keys.callbackURL
    },
    (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(!currentUser) {
                new User({
                    googleId: profile.id,
                    firstName: profile.name.givenName,
                    lastName: profile.name.familyName
                }).save()
                    .then((newUser) => {
                    done(null, newUser)
                })
            } else {
                done(null, currentUser)
            }
        })
    }
));

app.use(passport.initialize());
app.use(passport.session());

require('./backend/routes/google.routes.js')(app);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});