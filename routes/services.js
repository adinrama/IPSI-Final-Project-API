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

  const hospital = await Hospital.findOne({
    where: { email: req.body.hospitalEmail },
  });

  if (!hospital) {
    return res.status(400).json({
      message: "Hospital's email not found",
      status: "Failed",
    });
  }

  const serviceOld = await Service.findByPk(hospital.servicesId);

  const service = await Service.create({
    ...req.body,
    createdAt,
    updatedAt,
  });

  await hospital.update({ servicesId: service.id });

  if (serviceOld) {
    await serviceOld.destroy();
  }

  res.status(201).json({
    message: "Service added successfully",
    status: "Success",
    data: service,
  });
});

router.put("/:id", verifyToken, verifyRoles, async (req, res) => {
  const { id } = req.params;

  const schema = {
    vaccin: "string",
    pcrTest: "string",
    rapidAntigenTest: "string",
    genose: "string",
  };

  const updatedAt = new Date().toISOString();

  try {
    const services = await Service.findByPk(id);

    if (!services) {
      return res.status(404).json({
        message: "Services not found",
        status: "Failed",
      });
    }

    await services.update({ ...req.body, updatedAt });

    return res.status(200).json({
      message: "Services data updated successfully",
      status: "Success",
      data: services,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "An error occurred while editing services data",
      status: "Error",
    });
  }
});

module.exports = router;
