const express = require("express");
const router = express.Router();
const { Hospital, Service } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const verifyRoles = require("../middleware/verifyRoles");
const Validator = require("fastest-validator");
const v = new Validator();

router.post("/", verifyToken, verifyRoles, async (req, res) => {
  const schema = {
    hospitalEmail: "string|email",
    vaccin: "string",
    pcrTest: "string",
    rapidAntigenTest: "string",
    genose: "string",
  };

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const service = await Service.create({
    ...req.body,
    createdAt,
    updatedAt,
  });

  const hospital = await Hospital.findOne({
    where: { email: req.body.hospitalEmail },
  });

  await hospital.update({ servicesId: service.id });

  res.status(201).json({
    message: "Service added successfully",
    status: "Success",
    data: service,
  });
});

module.exports = router;
