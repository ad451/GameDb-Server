const Review = require("../models/reviewModel");
const asyncHandler = require("express-async-handler");

const getReviews = asyncHandler(async (req, res) => {
  const { contentId } = req.query;

  let filter = {};
  if (contentId !== undefined) {
    filter = { contentId };
  }

  const reviews = await Review.find(filter);

  res.json({ reviews });
});

const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  res.json({ review });
});

// POST: post a new Review to a contentId
const postReview = asyncHandler(async (req, res) => {
  const { title, body, contentId } = req.body;
  let parentId = null;
  if (req.query.parentId != undefined) {
    parentId = req.query.parentId;
  }

  const review = new Review({
    title,
    body,
    contentId,
    createdBy: req.user._id,
    parentId
  });

  const createdItem = await review.save();

  res.status(201).json(createdItem);
});

const patchReview = asyncHandler(async (req, res) => {
  const { body } = req.body;
  const patchedReview = await Review.findByIdAndUpdate(
    req.params.id,
    { body },
    { new: true }
  );

  res.json({ patchedReview });
});

const deleteReview = asyncHandler(async (req, res) => {
  const deletedReview = await Review.findByIdAndDelete(
    req.params.id,
  );

  res.json({ deletedReview });
});

module.exports = {
  postReview,
  getReviews,
  getReviewById,
  patchReview,
  deleteReview
};
