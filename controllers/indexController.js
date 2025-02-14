
const db = require("../db/queries")


async function renderIndex(req, res) {
  const messages = await db.getAllMessages()
  console.log(messages[0].date_posted.toDateString())
    res.render("index", { user: req.user, messages: messages });
    
}

async function logOutRedirect(req, res, next) {
    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
}
 

module.exports = {
    renderIndex,
    logOutRedirect
}