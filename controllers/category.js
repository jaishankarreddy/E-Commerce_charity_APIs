const cloudinary = require("../config/cloudinary");
const Category = require("../models/category");

async function createCategory(req, res) {
  try {
    const { title } = req.body;
    const user = req.user;
    console.log("this is user data from createCategory", user);
    if (!["admin", "super_admin"].includes(user.role)) {
      return res.status(400).json({
        status: "failed",
        message: "Only admin or super_admin can create a category",
      });
    }

    if (!title || !req.file) {
      return res
        .status(400)
        .json({ status: "failed", message: "Title and image are required" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "categories" },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            status: "failed",
            message: "Cloudinary upload error",
            error,
          });
        }

        const newCategory = new Category({
          title,
          image: result.secure_url,
          user_id: user.user_id,
        });

        await newCategory.save();

        return res.status(201).json({
          status: "success",
          message: "Category created successfully",
          data: newCategory,
        });
      }
    );

    uploadStream.end(req.file.buffer);
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
}

async function getCategoriesForAdmins(req, res) {
  try {
    const userRole = req.user.role;
    const userId = req.user.user_id;

    let categories;

    if (userRole === "super_admin") {
      // All categories
      categories = await Category.find();
    } else if (userRole === "admin") {
      // only the admins their categories
      categories = await Category.find({ user_id: userId });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Unauthorized: Only admins can access this route",
      });
    }

    res.status(200).json({
      status: "success",
      categories,
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
}

// GET CATEGORIES FOR PUBLIC
const getPublicCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res
      .status(200)
      .json({ message: "Public categories fetched", data: categories });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE CATEGORY TITLE
const updateCategoryTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const user = req.user;
    const id = req.params.id;

    const foundCategory = await Category.findById(id);
    if (!foundCategory)
      return res.status(404).json({ message: "Category not found" });

    const isOwner =
      foundCategory.user_id.toString() === user.user_id.toString();
    const isSuperAdmin = user.role === "super_admin";
    const isAdmin = user.role === "admin";

    if (!isSuperAdmin && !(isAdmin && isOwner)) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this category" });
    }

    foundCategory.title = title;
    await foundCategory.save();

    res.status(200).json({ message: "Category updated", data: foundCategory });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCategory,
  getCategoriesForAdmins,
  getPublicCategories,
  updateCategoryTitle,
};
