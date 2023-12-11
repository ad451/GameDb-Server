const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
  {
    body: { type: String, required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Can be a review or a list
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reply'}],
    // TODO: ensure that parentid is a valid document with the help of a middleware
    parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Reply" },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

replySchema.virtual("upvoteCount").get(() => {
  return this.upvotes.length;
});

replySchema.virtual("downvoteCount").get(() => {
  return this.downvotes.length;
});

replySchema.pre(/^find/, function (next) {
  this.populate({
    path: "createdBy",
    select: "name",
  });
  next();
});

replySchema.pre('save', function (next) {
  this.populate({
    path: "createdBy",
    select: "name",
  });
  next();
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;
