const Reply = require("../models/replymodel");
const asyncHandler = require("express-async-handler");

const postReply = asyncHandler(async (req, res) => {
  const { body, contentId } = req.body;

  const reply = new Reply({
    body,
    contentId,
    author: req.user._id,
  });

  const createdItem = await reply.save();
  res.status(201).json(createdItem);
});

const getAllReplies = asyncHandler(async (req, res) => {
  
  const replies = await Reply.find({});
  const count = await Reply.countDocuments();
  res.json({replies, count});
});

module.exports = { postReply, getAllReplies };
