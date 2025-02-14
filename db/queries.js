const pool = require("./pool");

async function getAllUsernames() {
    const {rows} = await pool.query("SELECT first_name FROM users ")
    return rows;
}

async function createUser(firstName, lastName) {
    await pool.query("INSERT INTO users (first_name, last_name, member) VALUES (($1), ($2), ('false'))", [firstName,lastName])
}

async function getUser(username) {
   const {rows} = await pool.query("SELECT * FROM users WHERE username = ($1)", [username])
   return rows[0];
}

async function getUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = ($1)", [id]);
    return rows[0];
 }



module.exports = {
    getAllUsernames,
    createUser,
    getUser,
    getUserById
}