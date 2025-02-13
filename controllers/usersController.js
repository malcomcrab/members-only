const { body, validationResult } = require("express-validator");

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
      usersStorage.addUser({ firstName, lastName });
      res.redirect("/");
    }
  ];

async function renderSignUpPage(req, res) {
    console.log('sign up page visited')
    res.render("signUpPage", {
        title: 'Sign up'
    })
}



module.exports = {
    renderSignUpPage,
    usersCreatePost
}