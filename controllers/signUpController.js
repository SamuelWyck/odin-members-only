const asyncHandler = require("express-async-handler");
const {signUpValidator} = require("../utils/validators.js");
const {validationResult} = require("express-validator");
const db = require("../db/querys.js");
const capitzlize = require("../utils/capitalize.js");
const bcrypt = require("bcryptjs");



const signUpGet = asyncHandler(async function(req, res) {
    return res.render("authenticate", {signUp: true});
});



const signUpPost = asyncHandler(async function(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("authenticate", {
            signUp: true,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            errors: errors.array()
        });
    }

    const firstname = capitzlize(req.body.firstname);
    const lastname = capitzlize(req.body.lastname);
    const username = req.body.username.trim();
    const pwdHash = await bcrypt.hash(req.body.password, 10);
    await db.addUser(firstname, lastname, username, pwdHash);

    return res.redirect("/login");
});



module.exports = {
    signUpGet,
    signUpPost: [
        signUpValidator,
        signUpPost
    ]
};