const asyncHandler = require("express-async-handler");
const List = require("../models/ListsModel.js");
const Game = require("../models/gameModel.js");

// @desc    Create new favourite item
// @route   POST /api/favourites
// @access  Private
const createList = asyncHandler(async (req, res) => {
   const {name, ListItems} = req.body
   const Lists = await List.create({
      name : name,
      ListItems,
      createdBy: req.user._id,
    });
    if (Lists) {
      res.status(201).json({
        _id: Lists._id,
        name: Lists.name,
        createdBy : Lists.createdBym,
        visibility: Lists.visibility,
        ListItems : Lists.ListItems
      });
    } else {
      res.status(400);
      throw new Error("Invalid List data");
    }
});



const addListItem = asyncHandler(async (req, res) => {
  const { ListItem } = req.body;

  const  list = await List.findById(req.params.listId);
  if (list){
    list.ListItems.push(ListItem)


    const createdItem = await list.save();
    if (createdItem) {
      res.status(201).json(createdItem);
    }
    else{
      res.status(400);
      throw new Error("Invalid List Item data");
    }
  }

});

const getMyListItems = asyncHandler(async (req, res) => {
  const ListItems = await List.find({ createdBy: req.user._id });
  res.json(ListItems);
});

const deleteListItem = asyncHandler(async (req, res) => {
  const Item = await List.findById(req.params.id);

  if (Item) {
    await Item.remove();
    res.json({ message: "game removed" });
  } else {
    res.status(404);
    throw new Error("game not found");
  }
});

module.exports = { addListItem, getMyListItems, deleteListItem , createList};
