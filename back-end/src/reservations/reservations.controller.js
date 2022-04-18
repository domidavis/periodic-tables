const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const { date } = req.query;
  console.log(date);
  if (date) {
    const list = await service.list(date);
    res.status(200).json({ data: list });
    console.log(list);
  } else {
    const list = await service.list();
    res.status(200).json({ data: list })
  }
}

function bodyDataHas(propName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if(data[propName]) {
      return next();
    }
    next({
      status: 400,
      message: `Reservation must include a ${propName}.`,
    });
  };
}

function dateTimeIsValid(req, res, next) {
  const { data: { reservation_date, reservation_time } = {} } = req.body;
  const dateFormat = /^\d{4}-\d{1,2}-\d{1,2}$/;
  const timeFormat = /^([0-2]?[0-9]|1[0-3]):[0-5][0-9]$/;

  if (dateFormat.test(reservation_date) && timeFormat.test(reservation_time)) {
    return next();
  }
  return next({
    status: 400,
    message: `reservation_date / reservation_time must be in valid format.`
  })
}

function dateIsFuture(req, res, next) {
  const { data: { reservation_date, reservation_time } = {} } = req.body;
  const today = new Date();
  const reservationDate = new Date(`${reservation_date} ${reservation_time}`);
  if (reservationDate < today) {
    return next({
      status: 400,
      message: `reservation must be for a future date and time`
    });
  } else {
    return next();
  }
}

function dateIsWorkingDay(req, res, next) {
  const { data: { reservation_date } = {} } = req.body;
  const date = new Date(reservation_date);
    if (date.getDay() === 1) {
      return next({
        status: 400,
        message: `Restaurant is closed on Tuesdays.`
      });
    } else {
      return next();
    }
}

function validatePeople(req, res, next) {
  const { data: { people } = {} } = req.body;
  if (typeof people === "number") {
    return next();
  }
  return next({ status: 400, message: `people must be a number` });
}

async function create(req, res, next) {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      people,
      reservation_date,
      reservation_time,
    } = {},
  } = req.body;
  const newRes = {
    first_name,
    last_name,
    mobile_number,
    people,
    reservation_date,
    reservation_time,
  };
  await service.create(newRes);
  res.status(201).json({ data: newRes });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("people"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    asyncErrorBoundary(dateTimeIsValid),
    asyncErrorBoundary(dateIsFuture),
    asyncErrorBoundary(dateIsWorkingDay),
    asyncErrorBoundary(validatePeople),
    asyncErrorBoundary(create)
  ]
}