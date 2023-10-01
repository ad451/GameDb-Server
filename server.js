const express = require("express");
const connectDB = require("./config/db.js");
// Routes
const gameRouter = require("./routes/gameRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const favouriteRouter = require("./routes/favouriteRoutes.js");
const replyRouter = require("./routes/replyRoutes.js");
const reviewRouter = require("./routes/reviewRoutes.js");

const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/api/v1/games", gameRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/favourites", favouriteRouter);
app.use("/api/v1/reply", replyRouter);
app.use("/api/v1/review", reviewRouter);


if (process.env.NODE_ENV === "production") {
  console.log(1)
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`.yellow.bold);
});
