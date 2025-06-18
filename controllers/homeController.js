const asyncHandler = require("express-async-handler");



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



module.exports = {
    homeGet,
    logOutGet
};