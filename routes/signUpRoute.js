const {Router} = require("express");
const signUpController = require("../controllers/signUpController.js");


const signUpRoute = Router();


signUpRoute.get("/", signUpController.signUpGet);
signUpRoute.post("/", signUpController.signUpPost);



module.exports = signUpRoute;