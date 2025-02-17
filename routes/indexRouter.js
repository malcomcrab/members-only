// routes/authorRouter.js
const { Router } = require("express");
const indexController = require("../controllers/indexController");


const indexRouter = Router();

indexRouter.get("/", indexController.renderIndex);
indexRouter.get("/log-out", indexController.logOutRedirect)
indexRouter.get("/membership", indexController.renderMembershipForm)

module.exports = indexRouter;

