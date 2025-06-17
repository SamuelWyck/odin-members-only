const passport = require("passport");
const LocalStratgey = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("./db/querys.js");



passport.use(
    new LocalStratgey(async function(username, password, done) {
        const errorMessage = "Incorrect username or password";

        try {
            const user = await db.getUserByUsername(username);
            if (!user) {
                return done(null, false, {message: errorMessage});
            }

            const match = bcrypt.compare(password, user.password);
            if(!match) {
                return done(null, false, {message: errorMessage});
            }

            return done(null, user);

        } catch (err) {
            return done(err);
        }
    })
);


passport.serializeUser(function(user, done) {
    done(null, user.id);
});


passport.deserializeUser(async function(id, done) {
    try {
        const user = await db.getUserById(id);

        done(null, user);
    } catch (err) {
        done(err);
    }
});



module.exports = passport;