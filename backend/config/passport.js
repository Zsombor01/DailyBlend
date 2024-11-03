const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("../model/User");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "identifier",
                passwordField: "password",
            },
            async (identifier, password, done) => {
                try {
                    const user = await User.findOne({
                        $or: [{ email: identifier }, { name: identifier }],
                    });

                    if (!user) {
                        return done(null, false, {
                            message: "That username or email is not registered",
                        });
                    }

                    const isMatch = await bcrypt.compare(
                        password,
                        user.password
                    );

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: "Password incorrect",
                        });
                    }
                } catch (err) {
                    return done(err);
                }
            }
        )
    );

    passport.serializeUser((user, cb) => {
        process.nextTick(function () {
            cb(null, user.id);
        });
    });

    passport.deserializeUser(async (id, cb) => {
        try{
          const user = await User.findById(id);
          if(!user){
            return cb(new Error('User not found'));
          }
          cb(null, user)
        }catch(err){
          cb(err);
        }
    });
};
