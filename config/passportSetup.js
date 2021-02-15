// Passport setup
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require('./google.config');
const User = require('../backend/models/users.model.js');

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
                    lastName: profile.name.familyName, 
                    profilePic: profile.photos[0].value,
                    email: profile.emails[0].value,
                    classYear: "",
                    classStatus: "",
                    gitHubLinks: ""
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

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});