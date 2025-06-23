const asyncHandler = require("express-async-handler");
const db = require("../db/querys.js");
const bcrypt = require("bcryptjs");



const membershipGet = asyncHandler(async function(req, res) {
    return res.render("specialAuth", {
        title: "Become a Member",
        action: "member"
    });
});


const membershipPost = asyncHandler(async function(req, res) {
    const password = req.body.password;
    const memberPwdHash = await db.getMembershipPassword();

    const match = await bcrypt.compare(password, memberPwdHash);
    if (!match) {
        return res.status(400).render("specialAuth", {
            title: "Become a Member",
            action: "member",
            errors: [{msg: "Incorrect password"}]
        });
    }

    const userId = req.user.id;
    await db.makeUserMember(userId);
    return res.redirect("/");
});


const adminGet = asyncHandler(async function(req, res) {
    return res.render("specialAuth", {
        title: "Become an Admin",
        action: "admin"
    });
});


const adminPost = asyncHandler(async function(req, res) {
    const password = req.body.password;
    const adminPwdHash = await db.getAdminPassword();

    const match = await bcrypt.compare(password, adminPwdHash);
    if (!match) {
        return res.status(400).render("specialAuth", {
            title: "Become an Admin",
            action: "admin",
            errors: [{msg: "Incorrect password"}]
        });
    }

    const userId = req.user.id;
    await db.makeUserAdmin(userId);
    return res.redirect("/");
});



module.exports = {
    membershipGet,
    membershipPost,
    adminGet,
    adminPost
};