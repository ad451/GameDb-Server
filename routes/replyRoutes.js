const express = require("express");
const { postReply, getReplies, getReplyById, patchReply, getReplyThread, deleteReply } = require("../controllers/replyController.js");
const { protect } = require("../middleware/authMiddleware.js");

const replyRouter = express.Router();

// Features
// 1. Post a reply
// 2. reply to a reply
// 3. view all replies to a post
// 4. view all replies to a reply

// TODO: add a validator that only reply author can patch and delete replies
replyRouter.route("/").get(getReplies).post(protect, postReply);
replyRouter.route("/:id").get(getReplyById).patch(protect, patchReply).delete(deleteReply)
replyRouter.route("/:id/thread").get(getReplyThread)


module.exports = replyRouter;
