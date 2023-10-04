const express = require("express");
const connectDB = require("./config/db.js");
// Routes
const gameRouter = require("./routes/gameRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const listRouter = require("./routes/listRoutes.js");
const replyRouter = require("./routes/replyRoutes.js");
const reviewRouter = require("./routes/reviewRoutes.js");

const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config();
connectDB();
const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/api/v1/game", gameRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/list", listRouter);
app.use("/api/v1/reply", replyRouter);
app.use("/api/v1/review", reviewRouter);




app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`.yellow.bold);
});
