const Game = require("../models/gameModel.js");
const getAllGames = async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  try {
    const count = await Game.countDocuments();

    const games = await Game.find()
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({ games, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    console.log(`${error}`.red); // Fix: Use `error` instead of `Error`
  }
};

const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    res.json(game);
  } catch (error) {
    console.log(`${error}`.red); // Fix: Use `error` instead of `Error`
  }
};


const getGameBySearch = async (req,res)=>{
  try {
    const searchTerm = req.query.term;
    const limit = parseInt(req.query.limit) || 10;
    const matchingGames = await Game.find({
      name: { $regex: new RegExp(searchTerm, 'i') } 
    }).limit(limit);
    res.json(matchingGames);
  } catch (error) {
    console.error('Error searching games:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}

module.exports = { getAllGames, getGameById,getGameBySearch };
