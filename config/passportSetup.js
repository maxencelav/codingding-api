// Passport setup
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const config = require('./env.config');
const User = require('../backend/models/users.model.js');

passport.use(new GoogleStrategy(
    {
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.callbackURL
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