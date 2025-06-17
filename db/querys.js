const pool = require("./pool.js");


async function getUserByUsername(username) {
    const {rows} = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );
    return rows[0];
};


async function getUserById(id) {
    const {rows} = pool.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
    );
    return rows[0];
};



module.exports = {
    getUserByUsername,
    getUserById
};