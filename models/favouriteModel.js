const mongoose = require("mongoose");

const favouriteSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    favouriteItems: {
      game: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Game",
      },
    },

    addedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Favourite = mongoose.model("Favourites", favouriteSchema);

module.exports = Favourite;



