const express = require("express");
const ListRouter = express.Router();

const {
  addListItem,
  deleteListItem,
  getMyListItems,
  createList
} = require("../controllers/ListsController.js");

const { protect } = require("../middleware/authMiddleware.js");

ListRouter.route("/createList").post(protect, createList);
ListRouter.route("/:listId/addItems/").patch(protect, addListItem);
ListRouter.route("/myListItems").get(protect, getMyListItems);
ListRouter.route("/:id").delete(protect, deleteListItem);

module.exports = ListRouter;
