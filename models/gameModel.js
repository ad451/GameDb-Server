const mongoose = require("mongoose");
const result= require("../data/rawg1.js");

const gameSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  released: {
    type: String,
    required: true,
  },

  background_image: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },

  ratings: [
    {
      id: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        required: true,
      },
      percent: {
        type: Number,
        required: true,
      },
    },
    {
      id: {
        type: Number,
      },
      title: {
        type: String,
      },
      count: {
        type: Number,
      },
      percent: {
        type: Number,
      },
    },
  ],

  metacritic: {
    type: Number,
  },
  playtime: {
    type: Number,
    required: true,
  },
  saturated_color: {
    type: String,
    required: true,
  },
  dominant_color: {
    type: String,
    required: true,
  },
  parent_platforms: [
    {
      platform: {
        id: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    },
    {
      platform: {
        id: {
          type: Number,
        },
        name: {
          type: String,
        },
      },
    },
  ],
  genres: [
    {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },

    {
      id: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Game = mongoose.model("game", gameSchema);

// const insertGames = async () => {
//   try {
//     // Use await to insert the games into the database
//     await Game.insertMany(result);
//     console.log("Games inserted successfully.");
//   } catch (err) {
//     console.error("Error inserting games:", err);
 
// }
// };

// insertGames();

module.exports = Game
