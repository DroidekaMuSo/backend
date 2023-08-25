const passport = require("passport");

const checkAuthJWT = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      console.log(
        "🚀 ~ file: aut_jwt.middleware.js:6 ~ passport.authenticate ~ info:",
        info
      );

      if (err) {
        return next(err);
      }

      if (!user) {
        return res
          .status(401)
          .json({ message: info.messages ? info.message : info.toSring() });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};

module.exports = checkAuthJWT
