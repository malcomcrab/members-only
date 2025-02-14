


async function renderIndex(req, res) {
    res.render("index", { user: req.user });
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