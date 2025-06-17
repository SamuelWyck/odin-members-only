const {Router} = require("express");
const logInController = require("../controllers/logInController.js");
const notLoggedIn = require("../utils/middleware/authMiddleware.js");


const logInRoute = Router();


logInRoute.get("/", notLoggedIn, logInController.logInGet);
logInRoute.post("/", notLoggedIn, logInController.logInPost);


module.exports = logInRoute;