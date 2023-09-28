const express = require("express");
const userRouter = express.Router();

const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/userController.js");

const { protect, admin } = require("../middleware/authMiddleware.js");

userRouter.route("/").post(registerUser).get(protect, admin, getUsers);
userRouter.post("/login", authUser);
userRouter.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
userRouter.route("/:id").delete(protect, admin, deleteUser).get(protect, admin, getUserById).put(protect, admin, updateUser);

module.exports = userRouter;
