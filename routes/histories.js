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
    historyStatus: "string",
  };

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const history = await History.findOne({
    where: { bookingId: req.body.bookingId },
  });

  if (history) {
    return res.status(400).json({
      message: "History already exists",
      status: "Failed",
    });
  }

  const booking = await Booking.findByPk(req.body.bookingId);

  if (booking.status != "You are registered") {
    return res.status(400).json({
      message: "Can't add history",
      status: "Failed",
    });
  }

  res.status(201).json({
    message: "Successfully add history",
    status: "Success",
    data: await History.create({ ...req.body }),
  });
});

router.get("/:userId", verifyToken, async (req, res) => {
  const { userId } = req.params;

  const booking = await Booking.findOne({
    where: { userId },
  });

  if (!booking) {
    return res.status(404).json({ message: "Histories not found" });
  }

  res.status(200).json({ data: booking, booking: req.decoded });
});

module.exports = router;
