const express = require("express");
const router = express.Router();
const { User, Hospital } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const verifyRoles = require("../middleware/verifyRoles");
const Validator = require("fastest-validator");
const v = new Validator();

router.get("/", verifyToken, async (req, res) => {
  const hospitals = await Hospital.findAll();
  res.status(200).json(hospitals);
});

router.post("/", verifyToken, verifyRoles, async (req, res) => {
  const schema = {
    rsAdminEmail: "string|email",
    name: "string|empty:false",
    numberCode: "number",
    telp: "string",
    email: "string|email",
    class: "string",
    usage_status: "string",
    owner: "string",
    address: "string",
  };

  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const findHospital = await Hospital.findOne({
    where: { email: req.body.email },
  });

  if (findHospital) {
    return res.status(400).json({
      message: "Hospital's email already exist",
      status: "Failed",
    });
  }

  const rsAdmin = await User.findOne({
    where: { email: req.body.rsAdminEmail },
  });

  if (!rsAdmin) {
    return res.status(400).json({
      message: "Admin's email not found",
      status: "Failed",
    });
  }

  const rsAdminId = rsAdmin.id;
  const servicesId = null;

  const hospital = await Hospital.create({
    rsAdminId,
    ...req.body,
    servicesId,
    createdAt,
    updatedAt,
  });

  res.status(201).json({
    message: "Hospital added successfully",
    status: "Success",
    data: hospital,
  });
});

router.put("/:id", verifyToken, verifyRoles, async (req, res) => {
  const { id } = req.params;

  const schema = {
    name: "string|empty:false",
    numberCode: "number",
    telp: "string",
    email: "string|email",
    class: "string",
    usage_status: "string",
    owner: "string",
    address: "string",
  };

  const updatedAt = new Date().toISOString();

  try {
    const hospital = await Hospital.findByPk(id);

    if (!hospital) {
      return res.status(404).json({
        message: "Hospital not found",
        status: "Failed",
      });
    }

    await hospital.update({ ...req.body, updatedAt });

    return res.status(200).json({
      message: "Hospital data updated successfully",
      status: "Success",
      data: hospital,
    });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({
      message: "An error occurred while editing hospital data",
      status: "Error",
    });
  }
});

module.exports = router;
