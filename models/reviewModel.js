const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    contentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }],
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "createdBy",
    select: "name",
  });
  next();
});

reviewSchema.pre('save', function (next) {
  this.populate({
    path: "createdBy",
    select: "name",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
