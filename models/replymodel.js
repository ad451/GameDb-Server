const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
  {
    body: String,
    level: {type: Number, min: 0, max: 1}, // 0 if base reply. 1 if nested reply
    contentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Game'},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // replies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reply'}],
    // TODO: ensure that parentid is a valid document with the help of a middleware
    parentId: {type: mongoose.Schema.Types.ObjectId, ref: 'Reply'},
    upvotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    downvotes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
  },
  { timestamps: true },
);


replySchema.virtual('upvoteCount').get(() => {
    return this.upvotes.length;
})

replySchema.virtual('downvoteCount').get(() => {
    return this.downvotes.length;
})

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;



