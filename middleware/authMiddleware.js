const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(JSON.stringify(error));
      res.status(401);
      if(error.name=='TokenExpiredError') {
        throw new Error("You have been logged out, please Login again");
      }
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});



const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("Not authorized as an admin");
  }
};

const verifyCreator = (Model) => {
  return async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    console.log(doc.createdBy,req.user._id)
    // TODO: add a field to req to avoid lookup of the doc again in the future
    if (doc.createdBy.toString() === req.user._id.toString()) next();
    else {
      res.status(403);
      throw new Error(
        "You cannot change this list as you are not its creator"
      );
    }
  };
};

module.exports = { protect, admin, verifyCreator };
