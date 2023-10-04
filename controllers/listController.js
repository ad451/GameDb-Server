const asyncHandler = require("express-async-handler");
const List = require("../models/listModel.js");
const Game = require("../models/gameModel.js");

// @desc    Create new favourite item
// @route   POST /api/favourites
// @access  Private
const createList = asyncHandler(async (req, res) => {
  const { name, items, visibility } = req.body;
  const createdList = await List.create({
    name,
    items,
    createdBy: req.user._id,
    visibility
  });
  if (createdList) {
    res.status(201).json(createdList);
  } else {
    res.status(400);
    throw new Error("Invalid List data");
  }
});

const addListItem = asyncHandler(async (req, res) => {
  const { item } = req.body;

  // TODO: what if array of items?
  // TODO: if item exists then return null
  const list = await List.findById(req.params.id);

  if (list) {
    list.items.push(item);

    const createdItem = await list.save();
    if (createdItem) {
      res.status(201).json(createdItem);
    } else {
      res.status(400);
      throw new Error("Invalid List Item data");
    }
  }
});

const getLists = asyncHandler(async (req, res) => {
  const { createdBy } = req.query;

  let filter = { visibility: "PUBLIC" };
  if (createdBy !== undefined) {
    filter.createdBy = createdBy;
  }

  const lists = await List.find(filter);
  res.json(lists);
});

const getListById = asyncHandler(async (req, res) => {
  // TODO: check if user is creator, if not and if private, throw error
  const list = await List.findById(req.params.id);
  res.json(list);
});

const deleteListItem = asyncHandler(async (req, res) => {
  const { item } = req.body;

  const list = await List.findById(req.params.id);

  if (list) {
    const items = list.items;
    try {
      items.forEach((current, index) => {
        if (current == item) {
          items.splice(index, 1);
        }
      });

      const deletedItem = await list.save();
      if (deletedItem) {
        res.json({ message: "game removed" });
      }
    } catch (error) {
      res.json({ message: "game not found" });
    }
  } else {
    res.status(404);
    throw new Error("List not found");
  }
});

module.exports = {
  getLists,
  getListById,
  createList,
  addListItem,
  deleteListItem,
};
