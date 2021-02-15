module.exports = (app) => {

    const passport = require("passport");

    app.get("/auth/google", passport.authenticate("google", {
        hd: "edu.itescia.fr",
        scope: ["profile", "email"]
    }));

    app.get("/auth/google/redirect",passport.authenticate("google"),(req,res)=>{
        res.send(req.user);
    });

    app.get("/auth/logout", (req, res) => {
        req.logout();
        res.send(req.user);
    });
}