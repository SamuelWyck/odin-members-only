const {body} = require("express-validator");
const db = require("../db/querys.js");


const notEmptyError = "must not be empty";
const tooLongError = "must be less than";


async function usernameAvailable(username) {
    const user = await db.getUserByUsername(username);
    return (user) ? false : true;
};


function passwordsMatch(password, {req}) {
    return password === req.body.password;
};



const signUpValidator = [
    body("firstname").trim()
        .notEmpty().withMessage(`Firstname ${notEmptyError}`)
        .isLength({max: 255}).withMessage(`Firstname ${tooLongError} 255 characters`),
    body("lastname").trim()
        .notEmpty().withMessage(`Lastname ${notEmptyError}`)
        .isLength({max: 255}).withMessage(`Lastname ${tooLongError} 255 characters`),
    body("username").trim()
        .notEmpty().withMessage(`Username ${notEmptyError}`)
        .isLength({max: 255}).withMessage(`Username ${tooLongError} 255 characters`)
        .matches(/^[^\s]+$/).withMessage("Username must not contain spaces")
        .matches(/[^\d]/).withMessage("Username must contain at least one letter")
        .custom(usernameAvailable).withMessage("Username not available"),
    body("password")
        .notEmpty().withMessage(`Password ${notEmptyError}`),
    body("confirm")
        .custom(passwordsMatch).withMessage("Passwords do not match")
];



module.exports = {
    signUpValidator
};