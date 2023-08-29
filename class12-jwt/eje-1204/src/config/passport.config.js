const passport = require("passport");
const jwt = require("passport-jwt");
const { SECRET_JWT, ROLES } = require("../constants/constants");

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET_JWT,
      },
      async (jwtPayload, done) => {
        console.log(
          "🚀 ~ file: passport.config.js:17 ~ async ~ jwtPayload:",
          jwtPayload
        );

        try {
          if (ROLES.includes(jwtPayload.role)) {
            return done(null, jwtPayload);
          }

          return done(null, jwtPayload);
        } catch (error) {
          console.log(
            "🚀 ~ file: passport.config.js:22 ~ async ~ error:",
            error
          );

          return done(error);
        }
      }
    )
  );
};

module.exports = initializePassport;
