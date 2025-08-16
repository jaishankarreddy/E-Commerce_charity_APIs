const Address = require("../models/address");

// Create address
async function createAddress(req, res) {
  try {
    const userId = req.user.user_id;
    console.log(req.body);
    const existing = await Address.findOne({ user_id: userId });
    if (existing) {
      return res.status(400).json({
        status: "failed",
        message: "User already has an address",
      });
    }

    let { location, city, pincode, state, country } = req.body;

    const newAddress = await Address.create({
      user_id: userId,
      location,
      city,
      pincode: Number(pincode),
      state,
      country,
    });

    return res.status(201).json({
      status: "success",
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Error creating address",
      error: err.message,
    });
  }
}

async function getAddress(req, res) {
  try {
    const userId = req.user.user_id;
    const address = await Address.findOne({ user_id: userId });

    if (!address) {
      return res.status(404).json({
        status: "failed",
        message: "No address found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: address,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Error fetching address",
      error: err.message,
    });
  }
}

async function updateAddress(req, res) {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    let address = await Address.findOne({ _id: id, user_id: userId });
    if (!address) {
      return res.status(403).json({
        status: "failed",
        message: "Not authorized or address not found",
      });
    }

    address = await Address.findByIdAndUpdate(id, req.body, { new: true });

    return res.status(200).json({
      status: "success",
      message: "Address updated successfully",
      data: address,
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Error updating address",
      error: err.message,
    });
  }
}

async function deleteAddress(req, res) {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const address = await Address.findOneAndDelete({
      _id: id,
      user_id: userId,
    });
    if (!address) {
      return res.status(403).json({
        status: "failed",
        message: "Not authorized or address not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Address deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Error deleting address",
      error: err.message,
    });
  }
}

module.exports = { createAddress, getAddress, updateAddress, deleteAddress };
