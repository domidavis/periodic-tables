const service = require("./tables.service");
const resService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { identity } = require("lodash");

async function list(req, res) {
    const tablesList = await service.list();
    res.status(200).json({ data: tablesList });
}

function bodyDataHas(propName) {
    return function (req, res, next) {
        const { data = {} } = req.body;
        if(data[propName]) {
            return next();
        }
        next({
            status:400,
            message: `Table must include a ${propName}`,
        });
    };
}
function validateTableName(req, res, next) {
    const { data: { table_name } = {} } = req.body;
    if (table_name.length > 1) {
        return next();
    }
    return next({
        status: 400,
        message: `table_name must have at least 2 characters`
    });
}

function validateCapacity(req, res, next) {
    const { data: { capacity } = {} } = req.body;
    if (typeof capacity === "number") {
        return next();
    }
    return next({
        status: 400,
        message: `capacity must be a number`
    });
}

async function create(req, res, next) {
    const {
        data: {
            table_name,
            capacity,
            reservation_id = null
        } = {},
    } = req.body;
    const newTable = {
        table_name,
        capacity,
        reservation_id,
        status: reservation_id ? "occupied" : "Free"
    };
    const response = await service.create(newTable);
    res.status(201).json({ data: response })
}
async function resExists(req, res, next) {
    const resId = req.body.data.reservation_id;
    if(resId) {
        const foundRes = await resService.read(resId)
        if(foundRes) {
          res.locals.reservation = foundRes;
          return next();
        }
    }
    next({ status: 404, message: `reservation ${resId} not found` });
  }

async function tableExists(req, res, next) {
    const found = await service.read(req.params.table_id);
    if(found) {
        res.locals.table = found;
        return next();
    }
    return next({
        status: 404,
        message: `table ${req.params.table_id} not found`,
    })
}

async function read(req, res, next) {
    res.status(200).json({ data: res.locals.table });
}

function checkCapacity(req, res, next) {
    const table = res.locals.table;
    const reservation = res.locals.reservation;
    if (table.capacity < reservation.people) {
        return next({ status:400, message: `Table must have capacity of at least ${reservation.people}`});
    }
    return next();
}

function checkAvailability(req, res, next) {
    const { reservation_id } = res.locals.table;
    if (!reservation_id) {
        return next();
    }
    return next({ status: 400, message: `Table ${res.locals.table.table_name} is occupied.`});
}

function isOccupied(req, res, next) {
    const { reservation_id } = res.locals.table;
    if (reservation_id) {
        return next();
    }
    return next({
        status: 400,
        message: `Table is not occupied.`,
    })
}

function reservationNotSeated(req, res, next) {
    const { status } = res.locals.reservation;
    if (status == "seated") {
        return next({ status: 400, message: `Reservation is already seated.`});
    }
    next();
}
async function seatTable(req, res, next) {
    const table = res.locals.table;
    const reservation = res.locals.reservation;
    const seated = await service.seat(table.table_id, reservation.reservation_id);
    console.log("tables.controller seatTable", seated)
     res.status(200).json({data:{seated}});
}

async function freeTable(req, res, next) {
    const { table_id, reservation_id } = res.locals.table;
    res.json({ data: await service.unseat(table_id, reservation_id) });
}

module.exports = {
    list,
    create: [
        bodyDataHas("table_name"),
        bodyDataHas("capacity"),
        asyncErrorBoundary(validateTableName),
        asyncErrorBoundary(validateCapacity),
        asyncErrorBoundary(create)
    ],
    read: [
        tableExists,
        read
    ],
    seatTable: [
        bodyDataHas("reservation_id"),
        resExists,
        tableExists,
        checkCapacity,
        checkAvailability,
        reservationNotSeated,
        seatTable
    ],
    freeTable: [
        tableExists,
        isOccupied,
        asyncErrorBoundary(freeTable)
    ]
}