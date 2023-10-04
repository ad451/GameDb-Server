const asyncHandler = require("express-async-handler");
const List = require("../models/listModel.js");
const Game = require("../models/gameModel.js");

// @desc    Create new favourite item
// @route   POST /api/favourites
// @access  Private
const createList = asyncHandler(async (req, res) => {
  const { name, items } = req.body;
  const createdList = await List.create({
    name: name,
    items,
    createdBy: req.user._id,
  });
  if (createdList) {
    res.status(201).json({
      _id: createdList._id,
      name: createdList.name,
      createdBy: createdList.createdBy,
      visibility: createdList.visibility,
      items: createdList.items,
    });
  } else {
    res.status(400);
    throw new Error("Invalid List data");
  }
});

const addListItem = asyncHandler(async (req, res) => {
  const { item } = req.body;

  const list = await List.findById(req.params.listId);
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
  const { userId } = req.query;

  let filter = {};
  if (contentId !== undefined) {
    filter = { userId };
  }

  const lists = await List.find({ filter });
  res.json(lists);
});

const getListById = asyncHandler(async (req, res) => {
  const list = await List.find({ _id: req.params.id });
  res.json(list);
});

const deleteListItem = asyncHandler(async (req, res) => {
  const { item } = req.body;

  const list = await List.findById(req.params.listId);

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
