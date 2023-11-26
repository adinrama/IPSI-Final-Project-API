const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const hospitalsRouter = require("./routes/hospitals");
const servicesRouter = require("./routes/services");
const schedulesRouter = require("./routes/schedules");
const bookingsRouter = require("./routes/bookings");
const historiesRouter = require("./routes/histories");

const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/hospitals", hospitalsRouter);
app.use("/v1/services", servicesRouter);
app.use("/v1/schedules", schedulesRouter);
app.use("/v1/bookings", bookingsRouter);
app.use("/v1/histories", historiesRouter);

module.exports = app;
