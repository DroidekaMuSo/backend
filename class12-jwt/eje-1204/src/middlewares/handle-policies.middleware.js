const passport = require("passport");

function handlePolicies(policies) {
  return (req, res, next) => {
    if (policies.length === 1 && policies[0] === "PUBLIC") {
      return next();
    }

    passport.authenticate("jwt", { session: false }, (err, userJWT, info) => {
      console.log(
        "🚀 ~ file: handle-policies.middleware.js:13 ~ return ~ userJWT:",
        userJWT
      );

      if (err) {
        return next(err);
      }

      if (!userJWT) {
        return res.status(401).send({ message: "Acces denied, invalid token" });
      }

      if (policies.includes(userJWT.user.role)) {
        req.user = userJWT;

        return next();
      } else {
        return res
          .status(403)
          .send({ message: "Access denied, rol not authorized" });
      }
    })(req, res, next);
  };
}

module.exports = handlePolicies;
