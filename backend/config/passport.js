const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const validPassword= require("../lib/passportUtils").validPassword
const USER_MODEL = require("../models/UserModel/userModel");

const customFields = {
  usernameField: "email",
  passwordField: "password",
};

const verifyCallback = (username, password, done) => {
  console.log("user name and all this ",username,password)
  USER_MODEL.findOne({ email: username })
    .then((user) => {
      if (!user) {
        return done(null, false);
      }
      console.log("user ",user)
      const isValid = validPassword(password, user.hash, user.salt);
      console.log("is valid ",isValid)
      if (isValid) {
                    //error,//
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
