const express = require("express");
const { getAllGames, getGameById,getGameBySearch } = require("../controllers/gameController.js");

const gameRouter = express.Router();

gameRouter.route("/").get(getAllGames);
gameRouter.get("/search", getGameBySearch);
gameRouter.get("/:id", getGameById);

module.exports = gameRouter;
