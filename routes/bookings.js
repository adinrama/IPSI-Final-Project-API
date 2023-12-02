const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const {
  VaccineSchedule,
  VaccineTicket,
  VaccineResult,
  Booking,
} = require("../models");
const verifyToken = require("../middleware/verifyToken");
const verifyRoles = require("../middleware/verifyRoles");
const Validator = require("fastest-validator");
const v = new Validator();

router.post(
  "/vaccine-schedule/:userId/:vaccineScheduleId",
  async (req, res) => {
    const { userId, vaccineScheduleId } = req.params;

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

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json(validate);
    }

    /* const token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;

  const getUserId = jwt.verify(token, SECRET_KEY, (err, decoded) => {
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

  const userId = getUserId;
  const vaccineScheduleId = id; */

    const findVaccineSchedule = await VaccineSchedule.findByPk(
      vaccineScheduleId
    );

    if (!findVaccineSchedule) {
      return res.status(400).json({
        message: "The schedule not found",
        status: "Failed",
      });
    } /*else if (findVaccineSchedule.available == "no") {
      return res.status(400).json({
        message: "The schedule has been booked",
        status: "Failed",
      });
    }*/

    const booking = await Booking.create({
      vaccineScheduleId,
      userId,
      ...req.body,
    });

    // await findVaccineSchedule.update({ available: "no" });

    await VaccineTicket.create({
      userId,
      vaccineScheduleId,
      bookingId: booking.id,
    });

    res.status(201).json({
      message: "Booking ticket created successfully",
      status: "Success",
      data: booking,
      userAccess: req.decoded,
    });
  }
);

router.put("/:id", verifyToken, verifyRoles, async (req, res) => {
  const { id } = req.params;

  const schema = {
    status: "string",
  };

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

    await booking.update({ ...req.body });
    await VaccineResult.create({
      bookingId: booking.id,
      firstName: booking.firstName,
      lastName: booking.lastName,
    });

    return res.status(201).json({
      message: "Booking ticket updated successfully",
      status: "Success",
      data: booking,
      userAccess: req.decoded,
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
