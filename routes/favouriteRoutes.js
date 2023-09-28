const express = require("express");
const favouriteRouter = express.Router();

const {
  addFavouriteItem,
  deleteFavouriteItem,
  getMyFavourites,
} = require("../controllers/favouriteController.js");

const { protect } = require("../middleware/authMiddleware.js");

favouriteRouter.route("/myfavourites").post(protect, addFavouriteItem);
favouriteRouter.route("/myfavourites").get(protect, getMyFavourites);
favouriteRouter.route("/:id").delete(protect, deleteFavouriteItem);

module.exports = favouriteRouter;
