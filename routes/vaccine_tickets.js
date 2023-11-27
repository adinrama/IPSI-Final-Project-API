const express = require("express");
const router = express.Router();
const { VaccineSchedule, Booking, VaccineTicket } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const Validator = require("fastest-validator");
const v = new Validator();

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const ticket = await VaccineTicket.findByPk(id);

  if (!ticket) {
    return res.status(404).json({
      message: "Vaccine ticket not found",
      status: "Failed",
    });
  }

  const schedule = await VaccineSchedule.findByPk(ticket.vaccineScheduleId);
  const booking = await Booking.findByPk(ticket.bookingId);

  res.status(200).json({
    bookingStatus: booking.status,
    scheduleDate: schedule.scheduleDate,
    scheduleTime: schedule.scheduleTime,
    scheduleLoc: schedule.location,
    userAccess: req.decoded,
  });
});

module.exports = router;
