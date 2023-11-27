const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const vaccineSchedulesRouter = require("./routes/vaccine_schedules");
const bookingsRouter = require("./routes/bookings");
const vaccineTicketsRouter = require("./routes/vaccine_tickets");
const vaccineResultsRouter = require("./routes/vaccine_results");
const newsRouter = require("./routes/news");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/vaccine-schedules", vaccineSchedulesRouter);
app.use("/v1/bookings", bookingsRouter);
app.use("/v1/vaccine-tickets", vaccineTicketsRouter);
app.use("/v1/vaccine-results", vaccineResultsRouter);
app.use("/v1/news", newsRouter);

module.exports = app;
