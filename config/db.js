const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(
      `MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(2)

    console.log(`Error: ${error.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
