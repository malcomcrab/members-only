// routes/authorRouter.js
const { Router } = require("express");
const messagesController = require("../controllers/messagesController");


const messagesRouter = Router();

messagesRouter.get("/get-messages", messagesController.getMessages)

module.exports = messagesRouter
