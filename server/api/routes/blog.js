import express from "express";
const router = express.Router();

import {
  registerBlog,
  getBlogs,
  getBlogById,
  deleteBlog,
  updateBlog,
} from "../controllers/blog.js";

import { protect, admin } from "../middlewares/auth.js";

router.route("/").post(protect, admin, registerBlog).get(getBlogs);

router
  .route("/:id")
  .delete(protect, admin, deleteBlog)
  .get(getBlogById)
  .put(protect, admin, updateBlog);

export default router;
