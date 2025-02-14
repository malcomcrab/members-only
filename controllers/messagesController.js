
const db = require("../db/queries")


async function getMessages(req, res) { 
  const messages = await db.getAllMessages()
  console.log(messages)
  res.redirect("/")
}

module.exports = {
    getMessages,
}