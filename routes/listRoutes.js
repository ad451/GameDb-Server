const express = require("express");

const {
  addListItem,
  deleteListItem,
  getLists,
  getListById,
  createList,
  getListsGames,
} = require("../controllers/listController");

const { protect, verifyCreator } = require("../middleware/authMiddleware.js");
const List = require("../models/listModel");

const listRouter = express.Router();

listRouter.route("/").post(protect, createList).get(getLists);
listRouter.route("/:id/").get(getListById);
listRouter
  .route("/:id/items").get(protect, verifyCreator(List),getListsGames)
  .patch(protect, verifyCreator(List), addListItem)
  .delete(protect, verifyCreator(List), deleteListItem);

module.exports = listRouter;
