const express = require("express");
const router = express.Router();
const { VaccineSchedule, VaccineResult, Booking } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const verifyRoles = require("../middleware/verifyRoles");
const Validator = require("fastest-validator");
const v = new Validator();

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
    booking,
    userAccess: req.decoded,
  });
});

module.exports = router;
