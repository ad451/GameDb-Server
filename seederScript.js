import dotenv from "dotenv";
dotenv.config();
import rawg1 from "./data/rawg1.js";
import users from "./data/userData.js";

import game from "./models/gameModel.js";
import User from "./models/userModel.js";
import Favourite from "./models/favouriteModel.js";
import connectDB from "./config/db.js";

connectDB();

const importData = async () => {
  try {
    await game.deleteMany();
    await User.deleteMany();
    await Favourite.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    const sampleGames = rawg1.map((game) => {
      return { ...game, user: adminUser };
    });

    await game.insertMany(sampleGames);
    console.log("Data Import: Success".green.inverse);
    process.exit(1);
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

importData();
