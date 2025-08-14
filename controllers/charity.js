const Charity = require("../models/charity");
const cloudinary = require("../config/cloudinary");

async function createCharity(req, res) {
  try {
    const {
      name,
      description,
      charity_email,
      start_date,
      end_date,
      platform_fee,
      donation_fee,
      profit,
    } = req.body;

    const user = req.user;
    // Role check
    if (!["admin", "super_admin"].includes(user.role)) {
      return res.status(403).json({
        status: "failed",
        message: "Only admin or super_admin can create charity entries",
      });
    }

    // Required fields check
    if (
      !name ||
      !description ||
      !charity_email ||
      !start_date ||
      !end_date ||
      !platform_fee ||
      !donation_fee ||
      !profit ||
      !req.file
    ) {
      return res.status(400).json({
        status: "failed",
        message: "All fields and banner image are required",
      });
    }

    // Upload image to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "charity_banners" },
      async (error, result) => {
        if (error) {
          return res.status(500).json({
            status: "failed",
            message: "Cloudinary upload error",
            error,
          });
        }

        const newCharity = new Charity({
          name,
          description,
          charity_email,
          start_date: new Date(start_date),
          end_date: new Date(end_date),
          platform_fee,
          donation_fee,
          profit,
          banner: result.secure_url,
          user_id: user.user_id,
        });
        console.log(newCharity);
        
        await newCharity.save();

        return res.status(201).json({
          status: "success",
          message: "Charity created successfully",
          data: newCharity,
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

async function getCharityAdmin(req, res) {
  try {
    const user = req.user;
    let charities;
    if (user.role === "super_admin") {
      charities = await Charity.find({});
    } else if (user.role === "admin") {
      charities = await Charity.find({ user_id: user.user_id });
    } else {
      return res.status(400).json({ message: "Unauthorized" });
    }

    res.status(200).json({ data: charities });
  } catch (err) {
    console.log(req.user);
    res.status(400).json({ message: err.message });
  }
}

async function getAllCharity(req, res) {
  try {
    const charities = await Charity.find({});
    res.status(200).json({ data: charities });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = { createCharity, getCharityAdmin, getAllCharity };
