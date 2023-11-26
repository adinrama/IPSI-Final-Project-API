const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const Validator = require("fastest-validator");
const v = new Validator();

router.post("/register", async (req, res) => {
  const schema = {
    fullName: "string|empty:false",
    username: "string|empty:false",
    mobile: "string",
    email: "string|email",
    password: "string",
    gender: "string",
    status: "string",
    address: "string",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const findEmail = await User.findOne({
    where: { email: req.body.email },
  });

  const findMobile = await User.findOne({
    where: { mobile: req.body.mobile },
  });

  const findUsername = await User.findOne({
    where: { username: req.body.username },
  });

  if (findEmail) {
    return res.status(400).json({
      message: "Email already exist",
      status: "Failed",
    });
  }

  if (findUsername) {
    return res.status(400).json({
      message: "Username already exist",
      status: "Failed",
    });
  }

  if (findMobile) {
    return res.status(400).json({
      message: "Mobile number already exist",
      status: "Failed",
    });
  }

  const user = await User.create({ ...req.body });
  res.status(201).json({
    message: "Registration successfully",
    status: "Success",
    data: user,
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: { username: req.body.username },
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
      status: "Failed",
    });
  }

  const passwordMatch = await user.validPassword(req.body.password);

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Invalid credentials",
      status: "Failed",
    });
  }

  user.token = jwt.sign(
    { userId: user.id, username: user.username },
    SECRET_KEY,
    {
      expiresIn: "10h",
    }
  );

  await user.update(user.token);

  return res.status(200).json({
    message: "Successfully login",
    status: "Success",
    id: user.id,
    user: user.fullName,
    token: user.token,
  });
});

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
      status: "Failed",
    });
  }

  res.status(200).json({ data: user, userAccess: req.decoded });
});

router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const schema = {
    fullName: "string|empty:false",
    mobile: "string",
    email: "string|email",
    password: "string",
    gender: "string",
    status: "string",
    address: "string",
  };

  const updatedAt = new Date().toISOString();

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "Failed",
      });
    }

    await user.update({ ...req.body, updatedAt });

    return res.status(200).json({
      message: "User data updated successfully",
      status: "Success",
      data: user,
      userAccess: req.decoded,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "An error occurred while editing user data",
      status: "Error",
    });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  try {
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "Failed",
      });
    }

    await user.destroy();

    return res.status(201).json({
      message: `User ${user.fullName} successfully deleted`,
      status: "Success",
      userAccess: req.decoded,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "An error occurred while delete user data",
      status: "Error",
    });
  }
});

module.exports = router;
