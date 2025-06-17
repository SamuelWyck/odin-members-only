const passport = require("../passport.js");
const asyncHandler = require("express-async-handler");



const logInGet = asyncHandler(async function(req, res) {
    return res.render("authenticate", {
        signUp: false
    });
});



const logInPost = asyncHandler(async function(req, res) {
    return res.render("authenticate", {
        signUp: false,
        username: req.body.username
    })
});



module.exports = {
    logInGet,
    logInPost: [
        passport.authenticate("local", {
            successRedirect: "/"
        }),
        logInPost
    ]
};
