const pool = require("./pool");

async function getAllUsernames() {
    const {rows} = await pool.query("SELECT first_name FROM users ")
    return rows;
}

async function createUser(firstName, lastName) {
    await pool.query("INSERT INTO users (first_name, last_name, member) VALUES (($1), ($2), ('false'))", [firstName,lastName])
}

module.exports = {
    getAllUsernames,
    createUser
}