const express = require("express");

const {
  addListItem,
  deleteListItem,
  getLists,
  getListById,
  createList,
} = require("../controllers/listController");

const { protect, verifyCreator } = require("../middleware/authMiddleware.js");
const List = require("../models/listModel");

const listRouter = express.Router();

listRouter.route("/").post(protect, createList).get(protect, getLists);
listRouter
  .route("/:id/")
  .get(getListById)
  .patch(protect, verifyCreator(List), addListItem)
  .delete(protect, verifyCreator(List), deleteListItem);

module.exports = listRouter;