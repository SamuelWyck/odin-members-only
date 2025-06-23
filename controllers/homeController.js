const asyncHandler = require("express-async-handler");
const db = require("../db/querys.js");
const {messageValidator} = require("../utils/validators.js");
const {validationResult} = require("express-validator");



const homeGet = asyncHandler(async function(req, res) {
    return res.render("homePage");
});



const logOutGet = asyncHandler(async function(req, res, next) {
    req.logout(function(error) {
        if (error) {
            return next(error);
        }
        return res.redirect("/");
    });
});




const newMessagePost = asyncHandler(async function(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).render("homePage", {
            shown: true,
            title: req.body.title,
            text: req.body.text,
            errors: errors.array()
        })
    }

    const messageId = await db.addMessage(req.body.title, req.body.text);
    await db.addMessageUserLink(req.user.id, messageId);
    return res.redirect("/");
});



module.exports = {
    homeGet,
    logOutGet,
    newMessagePost: [
        messageValidator,
        newMessagePost
    ]
};