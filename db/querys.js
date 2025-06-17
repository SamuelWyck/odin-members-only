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


async function addUser(firstname, lastname, username, password) {
    const {rows} = await pool.query(
        "INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [firstname, lastname, username, password]
    );
    return rows[0].id;
};


module.exports = {
    getUserByUsername,
    getUserById,
    addUser
};