const express = require("express");
const router = express.Router();
const { VaccineSchedule } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const verifyRoles = require("../middleware/verifyRoles");
const Validator = require("fastest-validator");
const v = new Validator();

router.post("/", verifyToken, verifyRoles, async (req, res) => {
  const schema = {
    scheduleDate: "string",
    scheduleTime: "string",
    location: "string",
  };

  const vaccine_schedule = await VaccineSchedule.create({ ...req.body });
  res.status(201).json({
    message: "Vaccine schedule added successfully",
    status: "Success",
    data: vaccine_schedule,
    userAccess: req.decoded,
  });
});

router.get("/", verifyToken, async (req, res) => {
  const vaccine_schedules = await VaccineSchedule.findAll();

  if (vaccine_schedules.length > 0) {
    const availableSchedules = vaccine_schedules.filter(
      (schedule) => schedule.available == "yes"
    );

    if (availableSchedules.length > 0) {
      res.status(200).json({
        vaccine_schedules: availableSchedules,
        userAccess: req.decoded,
      });
    } else {
      res.status(404).json({
        message: "Tidak ada jadwal vaksin yang tersedia.",
      });
    }
  } else {
    res.status(404).json({
      message: "Tidak ada jadwal vaksin yang ditemukan.",
    });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const vaccine_schedule = await VaccineSchedule.findByPk(id);

  if (!vaccine_schedule) {
    return res.status(404).json({
      message: "Tidak ada jadwal vaksin yang ditemukan.",
      status: "Failed",
    });
  }

  res.status(200).json({
    vaccine_schedule,
    userAccess: req.decoded,
  });
});

module.exports = router;
