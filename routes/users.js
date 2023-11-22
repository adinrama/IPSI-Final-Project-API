const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../models");
const { verifyToken } = require("../middleware/verifyToken");
const Validator = require("fastest-validator");
const v = new Validator();

router.post("/register", async (req, res) => {
  const schema = {
    fullName: "string|empty:false",
    mobile: "string",
    email: "string|email",
    password: "string",
    gender: "string",
    status: "string",
    address: "string",
  };

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

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

  if (findEmail || findMobile) {
    return res.status(400).json({
      message: "Email or mobile already exist",
      status: "Failed",
    });
  }

  const user = await User.create({ ...req.body, createdAt, updatedAt });
  res.status(201).json({
    message: "User added successfully",
    status: "Success",
    data: user,
  });
});

router.post("/login", async (req, res) => {
  const input = {
    email: "string|email",
    password: "string",
  };

  const validate = v.validate(req.body, input);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    return res.status(401).json({
      message: "Invalid email credentials",
      status: "Failed",
    });
  }

  const passwordMatch = await user.validPassword(req.body.password);

  if (!passwordMatch) {
    return res.status(401).json({
      message: "Invalid password credentials",
      status: "Failed",
    });
  }

  const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "10h",
  });

  await user.update(token);

  return res.status(200).json({
    message: "Successfully login",
    status: "Success",
    id: user.id,
    token: token,
  });
});

module.exports = router;
