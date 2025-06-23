const pool = require("./pool.js");


async function getUserByUsername(username) {
    const {rows} = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
    );
    return rows[0];
};


async function getUserById(id) {
    const {rows} = await pool.query(
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


async function addMessage(title, text) {
    const {rows} = await pool.query(
        "INSERT INTO messages (title, text) VALUES ($1, $2) RETURNING id",
        [title, text]
    );
    return rows[0].id;
};


async function addMessageUserLink(userId, messageId) {
    await pool.query(
        "INSERT INTO user_messages (user_id, message_id) VALUES ($1, $2)",
        [userId, messageId]
    );
};


module.exports = {
    getUserByUsername,
    getUserById,
    addUser,
    addMessage,
    addMessageUserLink
};