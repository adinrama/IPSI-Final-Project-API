const express = require("express");
const router = express.Router();
const { CovidTest } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const Validator = require("fastest-validator");
const v = new Validator();

router.post("/", verifyToken, async (req, res) => {
  const schema = {
    testDate: "string|empty:false",
    time: "string",
    firstName: "string",
    lastName: "string",
    NIK: "string",
    gender: "string",
    dateOfBirth: "string",
    age: "string",
    mobile: "string",
    email: "string|email",
    address: "string",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json(validate);
  }

  const covidTest = await CovidTest.findOne({
    where: { NIK: req.body.NIK },
  });

  if (covidTest) {
    return res.status(400).json({
      message: "Test reservation already exists",
      status: "Failed",
    });
  }

  await CovidTest.create({ ...req.body });

  res.status(201).json({
    message: "Data Form Telah Disimpan!",
    status: "Success",
    covidTest,
    userAccess: req.decoded,
  });
});

module.exports = router;
