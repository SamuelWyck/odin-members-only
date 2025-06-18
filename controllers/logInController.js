const passport = require("../passport.js");
const asyncHandler = require("express-async-handler");



const logInGet = asyncHandler(async function(req, res) {
    let errorMsg = null;
    if (req.session.messages) {
        errorMsg = req.session.messages[0];
        delete req.session.messages;
    }

    return res.render("authenticate", {
        signUp: false,
        errors: [{msg: errorMsg}]
    });
});



module.exports = {
    logInGet,
    logInPost:
        passport.authenticate("local", {
            successRedirect: "/",
            failureRedirect: "/login",
            failureMessage: true
        })
};
