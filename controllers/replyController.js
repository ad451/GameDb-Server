const Reply = require("../models/replymodel");
const asyncHandler = require("express-async-handler");

const getReplies = asyncHandler(async (req, res) => {
  const { contentId } = req.query;

  let filter = {};
  if (contentId !== undefined) {
    filter = { contentId };
  }

  const replies = await Reply.find(filter);

  res.json({ replies });
});

const getReplyById = asyncHandler(async (req, res) => {
  const replies = await Reply.findById(req.params.id);

  res.json({ replies });
});

// POST: post a new reply to a contentId
const postReply = asyncHandler(async (req, res) => {
  const { body, contentId } = req.body;
  let parentId = null;
  if (req.query.parentId != undefined) {
    parentId = req.query.parentId;
  }

  const reply = new Reply({
    body,
    contentId,
    author: req.user._id,
    parentId
  });

  const createdItem = await reply.save();
  res.status(201).json(createdItem);
});

const patchReply = asyncHandler(async (req, res) => {
  const { body } = req.body;
  const patchedReply = await Reply.findByIdAndUpdate(
    req.params.id,
    { body },
    { new: true }
  );

  res.json({ patchedReply });
});

const getReplyThread = asyncHandler(async (req, res) => {
  const replies = await Reply.find({ parent_id: req.params.id });

  res.json({ replies });
});

const deleteReply = asyncHandler(async (req, res) => {
  const deletedReply = await Reply.findByIdAndDelete(
    req.params.id,
  );

  res.json({ deletedReply });
});

module.exports = {
  postReply,
  getReplies,
  getReplyById,
  patchReply,
  getReplyThread,
  deleteReply
};
