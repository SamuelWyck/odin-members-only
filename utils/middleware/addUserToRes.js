function addUserToRes(req, res, next) {
    res.locals.user = req.user;
    next();
};


module.exports = addUserToRes;