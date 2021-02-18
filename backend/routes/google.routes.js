module.exports = (app) => {

    const passport = require("passport");

    app.get("/auth/google", passport.authenticate("google", {
        hd: "edu.itescia.fr",
        scope: ["profile", "email"]
    }));

    app.get("/auth/google/redirect", passport.authenticate("google", {
        successRedirect: '/'
    }),(req,res)=>{
        console.log("In Google Auth Login...");
    });

    app.get("/auth/logout", (req, res) => {
        req.logout();
        console.log('In Google Logout...')
        res.redirect('/');
    });
}