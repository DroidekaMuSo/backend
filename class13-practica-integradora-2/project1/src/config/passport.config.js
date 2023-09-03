const passport = require("passport");
const jwt = require("passport-jwt");
const { SECRET_JWT } = require("../constants/constants");

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {
  try {
    passport.use(
      "jwt",
      new JWTStrategy(
        {
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
          secretOrKey: SECRET_JWT,
        },
        async (jwtPaylod, done) => {
          console.log(
            "🚀 ~ file: passport.config.js:17 ~ jwtPaylod:",
            jwtPaylod
          );

          try {
            return done(null, jwtPaylod);
          } catch (error) {
            return done(error);
          }
        }
      )
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: passport.config.js:11 ~ initializePassport ~ error:",
      error
    );
  }
};

module.exports = initializePassport;
