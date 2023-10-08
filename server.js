const express = require("express");
const connectDB = require("./config/db.js");
// Routes
const gameRouter = require("./routes/gameRoutes.js");
const userRouter = require("./routes/userRoutes.js");
const ListRouter = require("./routes/ListsRoutes.js");
const replyRouter = require("./routes/replyRoutes.js");
const reviewRouter = require("./routes/reviewRoutes.js");
const cors = require('cors');
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
app.use(cors());
app.use(express.json());
app.use("/api/v1/Games", gameRouter);
app.use("/api/v1/Users", userRouter);
app.use("/api/v1/Lists", ListRouter);
app.use("/api/v1/Reply", replyRouter);
app.use("/api/v1/Review", reviewRouter);




app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`.yellow.bold);
});
