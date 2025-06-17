const {Router} = require("express");
const signUpController = require("../controllers/signUpController.js");
const {notLoggedIn} = require("../utils/middleware/authMiddleware.js");


const signUpRoute = Router();


signUpRoute.get("/", notLoggedIn, signUpController.signUpGet);
signUpRoute.post("/", notLoggedIn, signUpController.signUpPost);



module.exports = signUpRoute;