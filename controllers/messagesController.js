
const db = require("../db/queries")


async function getMessages(req, res) { 
  const messages = await db.getAllMessages()
  console.log(messages)
  res.redirect("/")
}

async function createMessage(req, res) {
  let ts = new Date(Date.now())
  const date_posted = ts.toLocaleDateString()
  const time_posted = ts.toLocaleTimeString()
  const {author_username, message} = req.body
  console.log(author_username,message, date_posted, time_posted)
  await db.createNewMessage(author_username,message, date_posted, time_posted)
  res.redirect("/")
}

module.exports = {
    getMessages,
    createMessage
}