const express = require("express");
require("dotenv").config();
const path = require("node:path");
const pool = require("./db/pool.js");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("./passport.js");
const addUserToRes = require("./utils/middleware/addUserToRes.js");
const signUpRoute = require("./routes/signUpRoute.js");
const logInRoute = require("./routes/logInRoute.js");
const homeRoute = require("./routes/homeRoute.js"); 




const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));

app.use(session({
    store: new pgSession({
        pool: pool,
        tableName: "user_session"
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24 * 7}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(addUserToRes);


app.use("/", homeRoute);
app.use("/signup", signUpRoute);
app.use("/login", logInRoute);


const PORT = process.env.PORT;


app.listen(PORT, function() {console.log(`Server running on port ${PORT}!`)});