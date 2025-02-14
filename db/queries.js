const pool = require("./pool");
const bcrypt = require ("bcryptjs");

async function getAllUsernames() {
    const {rows} = await pool.query("SELECT first_name FROM users ")
    return rows;
}

async function createUser(firstName, lastName, username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query("INSERT INTO users (first_name, last_name, username, password, member) VALUES (($1), ($2),($3),($4),('false'))", [firstName,lastName, username, hashedPassword])
}

async function getUser(username) {
   const {rows} = await pool.query("SELECT * FROM users WHERE username = ($1)", [username])
   return rows[0];
}

async function getUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = ($1)", [id]);
    return rows[0];
 }

async function getAllMessages(){
    const { rows } = await pool.query("SELECT * FROM messages")
    return rows
}

module.exports = {
    getAllUsernames,
    createUser,
    getUser,
    getUserById,
    getAllMessages
}