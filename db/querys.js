const pool = require("./pool.js");


const dateFormat = "Mon dd yyyy";


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


async function getAllMessages() {
    const {rows} = await pool.query(
        "SELECT m.id, TO_CHAR(m.timestamp, $1) as date, m.text, m.title, u.username, u.id as userid FROM messages AS m JOIN user_messages AS um ON um.message_id = m.id JOIN users AS u ON u.id = um.user_id",
        [dateFormat]
    );
    return rows;
};


async function deleteMessageById(id) {
    await pool.query(
        "DELETE FROM messages WHERE id = $1",
        [id]
    );
};


module.exports = {
    getUserByUsername,
    getUserById,
    addUser,
    addMessage,
    addMessageUserLink,
    getAllMessages,
    deleteMessageById
};