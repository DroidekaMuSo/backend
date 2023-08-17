const passport = require("passport");
const GithubStrategy = require("passport-github2");
require("dotenv").config();

const userModel = require("../model/user.model");

const { GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID } = process.env;

const initializePassport = () => {
  try {
    passport.use(
      "github",
      new GithubStrategy(
        {
          clientID: GITHUB_CLIENT_ID,
          clientSecret: GITHUB_CLIENT_SECRET,
          callbackURL: "http://localhost:5000/api/session/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            console.log("** Profile Info **", profile);

            let user = await userModel.findOne({ email: profile._json?.email });

            if (!user) {
              let addNewUser = {
                firstName: profile._json.name,
                lastName: "",
                email: profile._json?.email,
                age: 0,
                password: "",
              };

              let newUser = await userModel.create(addNewUser);

              done(null, newUser);
            } else {
              done(null, user);
            }
          } catch (error) {
            console.log("🚀 ~ file: passport.config.js:22 ~ error:", error);
            return done(error);
          }
        }
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
      let user = await userModel.findById({ _id: id });
      done(null, user);
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: passport.config.js:12 ~ initializePassport ~ error:",
      error
    );
  }
};

module.exports = initializePassport;
