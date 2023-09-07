const passport = require("passport");
const jwt = require("passport-jwt");
const { SECRET_JWT } = require("../constants/constants");

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
          "🚀 ~ file: passport.config.js:16 ~ jwtPayload:",
          jwtPayload
        );

        try {
          return done(null, jwtPayload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

module.exports = initializePassport;
