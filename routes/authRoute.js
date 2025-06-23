const {Router} = require("express");
const authController = require("../controllers/authController.js");



const authRoute = Router();


authRoute.get("/member", authController.membershipGet);
authRoute.post("/member", authController.membershipPost);
authRoute.get("/admin", authController.adminGet);
authRoute.post("/admin", authController.adminPost)



module.exports = authRoute;