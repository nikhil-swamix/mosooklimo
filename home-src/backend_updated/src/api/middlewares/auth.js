import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";

import Chauffeur from "../models/chauffeur.js";

const protect = asyncHandler(async (req, res, next) => {
  // console.log(req.headers);
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.data).select("-password");
      // console.log(decoded);

      next();
    } catch (error) {
      console.error(error);
      // res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const protectChauffeur = asyncHandler(async (req, res, next) => {
  // console.log(req.headers);
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Chauffeur.findById(decoded.data).select("-password");
      // console.log(decoded);

      next();
    } catch (error) {
      console.error(error);
      // res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin && req.user.isVerified) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin, protectChauffeur };
