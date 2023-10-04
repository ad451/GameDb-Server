const express = require("express");
const {
  postReview,
  getReviews,
  getReviewById,
  patchReview,
  deleteReview,
} = require("../controllers/reviewController.js");
const {upvoteReply,downvoteReply} = require("../controllers/voteController.js")

const { protect, verifyCreator } = require("../middleware/authMiddleware.js");
const Review = require("../models/reviewModel");
const reviewRouter = express.Router();

// Features
// 1. Post a Review
// 2. Get a Review
// 3. Patch a review
// 4. Delete a review

reviewRouter.route("/").get(getReviews).post(protect, postReview);

reviewRouter.route("/:id/upvote").patch(protect,upvoteReply(Review))
reviewRouter.route("/:id/downvote").patch(protect,downvoteReply(Review))
reviewRouter
  .route("/:id")
  .get(getReviewById)
  .patch(protect, verifyCreator(Review), patchReview)
  .delete(protect, verifyCreator(Review), deleteReview);

module.exports = reviewRouter;
