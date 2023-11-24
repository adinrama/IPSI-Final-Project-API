const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { Hospital, Schedule, Booking } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const verifyRoles = require("../middleware/verifyRoles");
const Validator = require("fastest-validator");
const v = new Validator();

router.post("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const schema = {
    firstName: "string|empty:false",
    lastName: "string|empty:false",
    NIK: "string",
    gender: "string",
    dateOfBirth: "string",
    age: "number",
    mobile: "string",
    email: "string|email",
    address: "string",
  };

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;

  const getId = jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token",
        status: "Failed",
      });
    }
    const userId = decoded.userId;
    console.log("User ID:", userId);
    return userId;
  });

  const hospital = await Hospital.findOne({
    where: { rsAdminId: getId },
  });

  const schedule = await Schedule.findOne({
    where: { hospitalId: hospital.id },
  });

  const userId = getId;
  const hospitalId = hospital.id;
  const scheduleId = id;

  const findSchedule = await Schedule.findByPk(scheduleId);

  if (findSchedule.available == "no") {
    return res.status(400).json({
      message: "The schedule has been booked",
      status: "Failed",
    });
  }

  const booking = await Booking.create({
    scheduleId,
    userId,
    hospitalId,
    ...req.body,
    createdAt,
    updatedAt,
  });

  await findSchedule.update({ available: "no" });

  res.status(201).json({
    message: "Booking ticket created successfully",
    status: "Success",
    data: booking,
  });
});

router.put("/:id", verifyToken, verifyRoles, async (req, res) => {
  const { id } = req.params;

  const schema = {
    status: "string",
  };

  const updatedAt = new Date().toISOString();

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  try {
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking ticket not found",
        status: "Failed",
      });
    }

    await booking.update({ ...req.body, updatedAt });

    return res.status(200).json({
      message: "Booking ticket updated successfully",
      status: "Success",
      data: booking,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "An error occurred while editing booking ticket",
      status: "Error",
    });
  }
});

module.exports = router;
