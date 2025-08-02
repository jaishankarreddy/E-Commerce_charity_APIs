const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

async function registeruser(req, res) {
  try {
    let { name, email, mobile, password, role } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        message: "User already exist",
      });
    }

    // Hash password
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(400).json({
          status: "Failed",
          message: "Error in hashing",
        });
      }
      const newUser = new User({
        name,
        email,
        mobile,
        password: hash,
        role,
      });

      const addedUser = await User.insertOne(newUser);
      console.log(addedUser);
      return res.status(201).json({
        status: "success",
        message: "User registration successfull",
        data: {
          user: addedUser,
        },
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function login(req, res) {
  try {
    const { user_id, password } = req.body;

    //Check if the identifier is mobile or email
    // let query = {};
    // if (/^\d{10}$/.test(user_id)) {
    //   query.mobile = Number(user_id);
    // } else {
    //   query.email = user_id;
    // }

    // Find user by query
    const existing_user = await User.findOne({
      $or: [{ email: user_id }, { mobile: user_id }],
    });

    if (!existing_user) {
      return res.status(400).json({
        status: "failed",
        message: "User does not exist",
      });
    }

    bcrypt.compare(password, existing_user.password, function (err, result) {
      if (err) {
        return res.status(400).json({
          status: "failed",
          message: "Error in decoding password",
        });
      }

      if (result) {
        // If password matched then create token
        jwt.sign(
          { user_id: existing_user._id, email: existing_user.email,role:existing_user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) {
              return res.status(500).json({
                status: "failed",
                message: "Error in creating the token",
              });
            }

            return res.status(200).json({
              status: "success",
              message: "User login successful",
              token: token,
            });
          }
        );
      } else {
        return res.status(400).json({
          status: "failed",
          message: "Invalid Credentials",
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      message: "Login error",
      error: err.message,
    });
  }
}

module.exports = { registeruser, login };
