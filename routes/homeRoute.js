const {Router} = require("express");
const homeController = require("../controllers/homeController.js");
const {loggedIn} = require("../utils/middleware/authMiddleware.js");


const homeRoute = Router();


homeRoute.get("/", homeController.homeGet);
homeRoute.get("/logout", loggedIn, homeController.logOutGet);
homeRoute.post("/new", homeController.newMessagePost);


module.exports = homeRoute;