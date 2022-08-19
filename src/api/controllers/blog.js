import asyncHandler from "express-async-handler";
import Blog from "../models/blog.js";

// @desc    Register a new Blog
// @route   POST /api/airports
// @access  Admin
const registerBlog = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const blogExist = await Blog.findOne({ name });
  if (blogExist) {
    res.status(400);
    throw new Error("Blog Name already exists");
  }
  const blog = await Blog.create({
    name,
    description,
  });

  if (blog) {
    res.status(201).json({
      _id: blog._id,
      name: blog.name,
      description: blog.description,
    });
  } else {
    res.status(400);
    throw new Error("Invalid blog data");
  }
});

// @desc    Get all airports
// @route   GET /api/airports
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs);
});

// @desc    Get blog by ID
// @route   GET /api/airports/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    res.json(blog);
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc    Delete blog
// @route   DELETE /api/airports/:id
// @access  Admin
const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    await blog.remove();
    res.json({ message: "Blog removed" });
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

// @desc    Update blog
// @route   PUT /api/airports/:id
// @access  Admin
const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog) {
    blog.name = req.body.name || blog.name;
    blog.description = req.body.description || blog.description;

    const updatedBlog = await blog.save();

    res.json({
      _id: updatedBlog._id,
      name: updatedBlog.name,
      description: updatedBlog.description,
    });
  } else {
    res.status(404);
    throw new Error("Blog not found");
  }
});

export { registerBlog, getBlogs, getBlogById, deleteBlog, updateBlog };
