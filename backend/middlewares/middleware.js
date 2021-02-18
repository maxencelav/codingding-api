const isLoggedIn = (req, res, next) => {
    if (req.user) {
      next();
    } else {
        res.status(401).send('Middleware : Not Logged In');
      }
    }

exports.isLoggedIn = isLoggedIn