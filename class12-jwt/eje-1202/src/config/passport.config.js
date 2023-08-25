const passport = require("passport");
const jwt = require("passport-jwt");
const { SECRET_JWT } = require("../utils/variables");

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieJWTExtractor = (req) => {
  let token;

  if (req && req.cookies) {
    token = req.cookies["cookieToken"];
  }

  return token;
};

const initializePassport = () => {
  try {
    passport.use(
      "jwt",
      new JWTStrategy(
        {
          jwtFromRequest: ExtractJWT.fromExtractors([cookieJWTExtractor]),
          secretOrKey: SECRET_JWT,
        },
        async (jwtPayload, done) => {
          try {
            console.log(`JWT information: ${jwtPayload}`);

            return done(null, jwtPayload);
          } catch (error) {
            console.log("🚀 ~ file: passport.config.js:31 ~ error:", error);

            return done(error);
          }
        }
      )
    );
  } catch (error) {
    console.log(
      "🚀 ~ file: passport.config.js:21 ~ initializePassport ~ error:",
      error
    );
  }
};

module.exports = initializePassport;
