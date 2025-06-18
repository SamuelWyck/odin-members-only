const {Router} = require("express");
const homeController = require("../controllers/homeController.js");
const {loggedIn} = require("../utils/middleware/authMiddleware.js");


const homeRoute = Router();


homeRoute.get("/", homeController.homeGet);
homeRoute.get("/logout", loggedIn, homeController.logOutGet);


module.exports = homeRoute;