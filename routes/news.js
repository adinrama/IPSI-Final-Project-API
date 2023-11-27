const express = require("express");
const router = express.Router();
const { News } = require("../models");
const verifyToken = require("../middleware/verifyToken");
const Validator = require("fastest-validator");
const v = new Validator();

router.post("/", verifyToken, async (req, res) => {
  const schema = {
    photo: "string",
    title: "string",
    article: "string",
  };

  const title = await News.findOne({
    where: { title: req.body.title },
  });

  if (title) {
    return res.status(400).json({
      message: "News already exist",
      status: "Failed",
    });
  }

  const news = await News.create({ ...req.body });
  res.status(201).json({
    message: "News added successfully",
    status: "Success",
    data: news,
    userAccess: req.decoded,
  });
});

router.get("/", verifyToken, async (req, res) => {
  const news = await News.findAll();
  res.status(200).json({
    news,
    userAccess: req.decoded,
  });
});

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;

  const news = await News.findByPk(id);

  if (!news) {
    return res.status(404).json({
      message: "News not found",
      status: "Failed",
    });
  }

  res.status(200).json({
    news,
    userAccess: req.decoded,
  });
});

module.exports = router;
