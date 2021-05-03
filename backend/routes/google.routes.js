var jwt = require('jsonwebtoken')

module.exports = (app) => {

    const passport = require("passport");

    app.get("/auth/google", passport.authenticate("google", {
        hd: "edu.itescia.fr",
        scope: ["profile", "email"]
    }, (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "Authorization");
        res.header("Access-Control-Allow-Credentials", true)
    }));

    app.get("/auth/google/redirect", passport.authenticate("google"),(req,res)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept", "Authorization");
        res.header("Access-Control-Allow-Credentials", true)

       
        const token = jwt.sign( {
              user: req.user,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "7d"
            }
          );
        res.cookie("token", token, {httpOnly: false})
        res.send(req.user);
    });

    app.get("/auth/logout", (req, res) => {
        res.clearCookie("token");
        req.logout();
        res.send(req.user);
    });
}