const express = require("express");
const {
  postReply,
  getReplies,
  getReplyById,
  patchReply,
  getReplyThread,
  deleteReply,
} = require("../controllers/replyController.js");
const { protect, verifyCreator } = require("../middleware/authMiddleware.js");
const Reply = require("../models/replymodel");
const replyRouter = express.Router();

// Features
// 1. Post a reply
// 2. reply to a reply
// 3. view all replies to a post
// 4. view all replies to a reply

replyRouter.route("/").get(getReplies).post(protect, postReply);
replyRouter
  .route("/:id")
  .get(getReplyById)
  .patch(protect, verifyCreator(Reply), patchReply)
  .delete(protect, verifyCreator(Reply), deleteReply);
replyRouter.route("/:id/thread").get(getReplyThread);

module.exports = replyRouter;
