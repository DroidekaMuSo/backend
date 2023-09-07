const passport = require("passport");

function handlePolicies(policies) {
  return (req, res, next) => {
    if (policies.length === 1 && policies[0] === "PUBLIC") {
      return next();
    }

    passport.authenticate("jwt", { session: false }, (err, userJWT, info) => {
      console.log(
        "🚀 ~ file: handlePolicies.middleware.js:13 ~ return ~ userJWT:",
        userJWT
      );

      if (err) {
        return next(err);
      }

      if (!userJWT) {
        return res
          .status(401)
          .send({ message: "Access denied, invalid or expired token" });
      }

      if (policies.includes(userJWT.user.role)) {
        req.user = userJWT;

        return next();
      } else {
        return res
          .status(403)
          .send({ message: "Access denied, unathorized rol" });
      }
    })(req, res, next);
  };
}

module.exports = handlePolicies;
