const { response } = require("express");
const mongoose = require("mongoose");
const fetch = require('node-fetch');
const dotenv = require("dotenv");

dotenv.config();

const gameSchema = mongoose.Schema({
  owner: String,
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
    required: false,
    default: null
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

const Game = mongoose.model("Game", gameSchema);



module.exports = Game;
