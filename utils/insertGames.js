const { response } = require("express");
const mongoose = require("mongoose");
const fetch = require('node-fetch');
const dotenv = require("dotenv");
import Game from "../models/gameModel";
dotenv.config();

const insertGames = async () => {
    for (let page = 10001; page <= 20000; page++) {
        console.log(page);
        try {
            let response = await fetch(`https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${page}`)
            let json_reponse = await response.json();
            const items = json_reponse.results;

            await Game.insertMany(items);
        }

        catch (err) {
            console.log(err);
        }
        console.log("Games inserted successfully.");
    }

}

insertGames();