const { body, validationResult } = require("express-validator");
const db = require("../db/queries")

// validateUser error messages
const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

/* Form data from the usersCreatePost function is checked for validation against the rules
setout in this array. If an input has been filled out incorrectly the corresponding error
is returned
*/
const validateUser = [
    body("firstName").trim()
      .isAlpha().withMessage(`First name ${alphaErr}`)
      .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
    body("lastName").trim()
      .isAlpha().withMessage(`Last name ${alphaErr}`)
      .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
  ];

/* When the user sign up form is submitted the form data is validated against the rules in the 
 validateUser array. 
*/ 
  const usersCreatePost = [
    validateUser,
    (req, res) => {
      const errors = validationResult(req);
/* If a specified error is detected the signUpPage is rerendered with the returned error message 
displayed in the errors.ejs partial.
*/
      if (!errors.isEmpty()) {
        return res.status(400).render("signUpPage", {
          title: "Create user",
          errors: errors.array(),
        });
      }
/* If no errors are detected the signup form data is passed to the createUser function in db/queries
to be added to the database table as a new user.
*/
      try {

        const { firstName, lastName, username, password } = req.body;
        db.createUser(firstName, lastName, username, password);
        res.redirect("/");
      } catch (error) {
        console.error(error);
        next(error);
      }


    }
  ];

//Render sing up page when url is visited.
async function renderSignUpPage(req, res) {
    res.render("signUpPage", { user: req.user,
        title: 'Sign up'
    })
}


module.exports = {
    renderSignUpPage,
    usersCreatePost
}