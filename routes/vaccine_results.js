const express = require("express");
const router = express.Router();
const { VaccineSchedule, VaccineResult, Booking } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const verifyRoles = require("../middleware/verifyRoles");
const Validator = require("fastest-validator");
const v = new Validator();

router.get("/", verifyToken, verifyRoles, async (req, res) => {
  const patients = await VaccineResult.findAll();

  res.status(200).json({
    message: "Vaccine patients data found",
    status: "Success",
    vaccineResultId: patients.id,
    firstName: patients.firstName,
    lastName: patients.lastName,
    userAccess: req.decoded,
  });
});

router.put("/:id", verifyToken, verifyRoles, async (req, res) => {
  const schema = {
    certificateId: "string|empty:false",
    vaccineDate: "string|empty:false",
    time: "string",
    firstName: "string",
    lastName: "string",
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

  try {
    const vaccine = await VaccineResult.findByPk(id);

    if (!vaccine) {
      return res.status(404).json({
        message: "Patient data not found",
        status: "Failed",
      });
    }

    await vaccine.update({ ...req.body });

    return res.status(201).json({
      message: "Vaccine certificate uploaded successfully",
      status: "Success",
      data: vaccine,
      userAccess: req.decoded,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "An error occurred while upload vaccine certificate",
      status: "Error",
    });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const certificate = await VaccineResult.findByPk(id);

  if (!certificate) {
    return res.status(404).json({
      message: "Vaccine certificate not found",
      status: "Failed",
    });
  }

  const booking = await Booking.findByPk(certificate.bookingId);

  res.status(200).json({
    status: "Success",
    certificate,
    booking,
    userAccess: req.decoded,
  });
});

module.exports = router;
