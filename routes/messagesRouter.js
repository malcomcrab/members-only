// routes/authorRouter.js
const { Router } = require("express");
const messagesController = require("../controllers/messagesController");


const messagesRouter = Router();

messagesRouter.get("/get-messages", messagesController.getMessages)
messagesRouter.post("/create-message", messagesController.createMessage)
messagesRouter.post("/change", messagesController.changeMembership)

module.exports = messagesRouter
