const express = require("express");
const router = express.Router();
const { VaccineSchedule, Booking, VaccineTicket } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const verifyRoles = require("../middleware/verifyRoles");
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

router.delete("/:bookingId", verifyToken, verifyRoles, async (req, res) => {
  const { bookingId } = req.params;

  const ticket = await VaccineTicket.findOne({
    where: { bookingId },
  });

  try {
    if (!ticket) {
      return res.status(404).json({
        message: "Ticket not found",
        status: "Failed",
      });
    }

    await ticket.destroy();

    return res.status(201).json({
      message: `Vaccine ticket successfully deleted`,
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
