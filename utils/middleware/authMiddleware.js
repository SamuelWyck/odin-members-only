function notLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect("/");
    }

    return next();
};


function loggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect("/");
};


module.exports = {
    notLoggedIn,
    loggedIn
};