// routes/authorRouter.js
const { Router } = require("express");
const usersController = require("../controllers/usersController");


const usersRouter = Router();

usersRouter.get("/sign-up-page", usersController.renderSignUpPage)
usersRouter.post("/create", usersController.usersCreatePost);


module.exports = usersRouter;
