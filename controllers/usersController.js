const { body, validationResult } = require("express-validator");
const db = require("../db/queries")
const usersStorage = require("../storages/usersStorage");
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUser = [
    body("firstName").trim()
      .isAlpha().withMessage(`First name ${alphaErr}`)
      .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
    body("lastName").trim()
      .isAlpha().withMessage(`Last name ${alphaErr}`)
      .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
  ];

  const usersCreatePost = [
    validateUser,
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("signUpPage", {
          title: "Create user",
          errors: errors.array(),
        });
      }
      const { firstName, lastName } = req.body;
      db.createUser(firstName, lastName);
      res.redirect("/");
    }
  ];

async function renderSignUpPage(req, res) {
  const usernames = await db.getAllUsernames();
  console.log(usernames)
    res.render("signUpPage", {
        title: 'Sign up'
    })
}

module.exports = {
    renderSignUpPage,
    usersCreatePost
}