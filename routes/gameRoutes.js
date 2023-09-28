const express = require("express");
const { getAllGames, getGameById } = require("../controllers/gameController.js");

const gameRouter = express.Router();

gameRouter.route("/").get(getAllGames);
gameRouter.get("/:id", getGameById);

module.exports = gameRouter;
