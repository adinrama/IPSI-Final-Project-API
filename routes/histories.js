const express = require("express");
const router = express.Router();
const { Booking, History } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const verifyRoles = require("../middleware/verifyRoles");
const Validator = require("fastest-validator");
const v = new Validator();

router.post("/", verifyToken, verifyRoles, async (req, res) => {
  const schema = {
    bookingId: "number",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const booking = await Booking.findByPk(req.body.bookingId);

  if (!booking) {
    return res.status(404).json({
      message: "Booking ticket not found",
      status: "Failed",
    });
  }

  let history = await History.findOne({
    where: { bookingId: req.body.bookingId },
  });

  if (history) {
    return res.status(400).json({
      message: "History already exists",
      status: "Failed",
    });
  }

  const historyStatus = "Has been vaccinated";

  history = await History.create({ ...req.body, historyStatus });

  res.status(201).json({
    message: "Successfully add history",
    status: "Success",
    historyStatus: historyStatus,
    data: history,
  });
});

router.get("/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;

  const booking = await Booking.findAll({
    where: { userId },
  });

  if (!booking) {
    return res.status(404).json({
      message: "User has not placed an order yet",
      status: "Failed",
    });
  }

  const history = await History.findAll({
    where: { bookingId: booking.id },
  });

  res.status(200).json({
    dataBooking: booking,
    dataHistory: history,
    booking: req.decoded,
  });
});

module.exports = router;
