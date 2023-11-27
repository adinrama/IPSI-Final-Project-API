const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const { User } = require("../models");

const verifyRoles = async (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;

  const getId = jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        message: "Invalid token",
        status: "Failed",
      });
    }
    const userId = decoded.userId;
    console.log("User ID:", userId);
    return userId;
  });

  const findRsAdmin = await User.findOne({
    where: { id: getId, status: "rsadmin" },
  });

  const findSysAdmin = await User.findOne({
    where: { id: getId, status: "sysadmin" },
  });

  if (findRsAdmin || findSysAdmin) {
    next();
  } else {
    return res.status(401).json({
      message: "Not authorized",
      status: "Failed",
    });
  }
};

module.exports = verifyRoles;
