const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const serverless = require("serverless-http");

const indexRouter = require("../routes/index");
const usersRouter = require("../routes/users");
const hospitalsRouter = require("../routes/hospitals");
const servicesRouter = require("../routes/services");
const schedulesRouter = require("../routes/schedules");
const bookingsRouter = require("../routes/bookings");
const historiesRouter = require("../routes/histories");
const newsRouter = require("../routes/news");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(`/.netlify/functions/api`, indexRouter);
app.use(`/.netlify/functions/api/v1/users`, usersRouter);
app.use(`/.netlify/functions/api/v1/hospitals`, hospitalsRouter);
app.use(`/.netlify/functions/api/v1/services`, servicesRouter);
app.use(`/.netlify/functions/api/v1/schedules`, schedulesRouter);
app.use(`/.netlify/functions/api/v1/bookings`, bookingsRouter);
app.use(`/.netlify/functions/api/v1/histories`, historiesRouter);
app.use(`/.netlify/functions/api/v1/news`, newsRouter);

module.exports = app;
module.exports.handler = serverless(app);
