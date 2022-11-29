const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

module.exports = function (passport) {

    passport.use(new LocalStrategy(function (username, password, done) {

        let user = {
            name: "Sadiq",
            username: "sadiq",
            password: "sadiq",
        };

        if (username.toLowerCase() == user.username && password == user.password) {
            return done(null, user);
        } else if (username.toLowerCase() !== user.username && password !== user.password) {
            return done(null, false, { message: 'Invalid username & password', type: "danger" });
        } else if (username.toLowerCase() !== user.username) {
            return done(null, false, { message: 'Invalid username', type: "danger" });
        } else {
            return done(null, false, { message: 'Invalid Password', type: "danger" });
        }

        // bcrypt.compare(password, user.password, function (err, isMatch) {
        //     if (err) console.log(err);
        //     if (isMatch) {
        //         return done(null, user);
        //     } else {
        //         return done(null, false, { message: 'Wrong Password.' });
        //     }
        // });
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(function (username, done) {
        let user = {
            name: "Sadiq",
            username: "sadiq",
            password: "sadiq",
        };
        done(null, user)
    });
}