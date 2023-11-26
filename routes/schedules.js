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

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;

  const getRsAdminId = jwt.verify(token, SECRET_KEY, (err, decoded) => {
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
    where: { rsAdminId: getRsAdminId },
  });

  const hospitalId = hospital.id;

  const schedule = await Schedule.create({
    hospitalId,
    ...req.body,
  });

  res.status(201).json({
    message: "Schedule created successfully",
    status: "Success",
    hospital: hospital.name,
    data: schedule,
    userAccess: req.decoded,
  });
});

router.get("/", verifyToken, async (req, res) => {
  const schedules = await Schedule.findAll();
  res.status(200).json({
    schedules,
    userAccess: req.decoded,
  });
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

  const hospital = await Hospital.findOne({
    where: { id: schedule.hospitalId },
  });

  res.status(200).json({
    hospital: hospital.name,
    data: schedule,
    schedule: req.decoded,
  });
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
      userAccess: req.decoded,
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
