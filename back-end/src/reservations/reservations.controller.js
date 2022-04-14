const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../utils/hasProperties");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "reservation_id",
];

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

//const VALID_STATUS = ["booked", "seated", "finished", "cancelled"];

const hasRequiredProperties = hasProperties(REQUIRED_PROPERTIES);

function hasValidProperties(req, res, next) {
  const { data } = req.body;

  const invalidFields = Object.keys(data).filter((field) => !VALID_PROPERTIES.includes(field));

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid Field(s): ${invalidFields.join(", ")}`,
    });
  next();
  }
}

async function resExists(req, res, next) {
  const { reservation_id } = req.params;
  const foundRes = await service.read(reservation_id);

  if(!foundRes) {
    return next({
      status: 404,
      message: `Reservation ${reservation_id} not found`,
    });
  }
}

function validateTime(req, res, next) {
  const { reservation_time } = req.body.data;
  const valid = /\d\d:\d\d/;

  if(!reservation_time) {
    return next({
      status: 400,
      message: "Reservation time required",
    });
  }

  if(!reservation_time.match(valid)) {
    return next({
      status: 400,
      message: "Please provide time in valid format",
    });
  }
}

async function list(req, res) {
  const { date, mobile_number } = req.query;
  if(date) {
    res.json({ data: await service.listByDate(date) });
  } else {
    res.json({ data: await service.list() });
  }
}

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

function read(req, res) {
  res.json({ data: res.locals.reservation });
}
module.exports = {
  create:[
    hasRequiredProperties,
    hasValidProperties,
    validateTime,
    asyncErrorBoundary(create)
  ],
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(resExists), read]
};
