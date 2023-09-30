const express = require("express");
const { postReply, getAllReplies } = require("../controllers/replyController.js");
const { protect } = require("../middleware/authMiddleware.js");

const replyRouter = express.Router();

replyRouter.route("/").get(getAllReplies).post(protect, postReply);


module.exports = replyRouter;
