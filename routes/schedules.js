const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { Hospital, Schedule } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const verifyRoles = require("../middleware/verifyRoles");
const Validator = require("fastest-validator");
const v = new Validator();

router.post("/", verifyToken, verifyRoles, async (req, res) => {
  const schema = {
    scheduleTime: "string",
    available: "string",
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

  const getEmail = jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token",
        status: "Failed",
      });
    }
    const email = decoded.email;
    console.log("User Email:", email);
    return email;
  });

  const hospital = await Hospital.findOne({
    where: { rsAdminEmail: getEmail },
  });

  const hospitalId = hospital.id;

  const schedule = await Schedule.create({
    hospitalId,
    ...req.body,
    createdAt,
    updatedAt,
  });

  res.status(201).json({
    message: "Schedule created successfully",
    status: "Success",
    data: schedule,
  });
});

router.get("/", verifyToken, async (req, res) => {
  const schedules = await Schedule.findAll();
  res.status(200).json(schedules);
});

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const schedule = await Schedule.findByPk(id);

  if (!schedule) {
    return res.status(404).json({
      message: "Schedule not found",
      status: "Failed",
    });
  }

  res.status(200).json({ data: schedule, schedule: req.decoded });
});

router.put("/:id", verifyToken, verifyRoles, async (req, res) => {
  const { id } = req.params;

  const schema = {
    scheduleTime: "string",
    available: "string",
  };

  const updatedAt = new Date().toISOString();

  try {
    const schedule = await Schedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({
        message: "Schedule not found",
        status: "Failed",
      });
    }

    await schedule.update({ ...req.body, updatedAt });

    return res.status(200).json({
      message: "Schedule data updated successfully",
      status: "Success",
      data: schedule,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "An error occurred while editing schedule data",
      status: "Error",
    });
  }
});

module.exports = router;
