const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

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
        } = {},
    } = req.body;
    const newTable = {
        table_name,
        capacity,
    };
    await service.create(newTable);
    res.status(201).json({ data: newTable })
}
module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        bodyDataHas("table_name"),
        bodyDataHas("capacity"),
        asyncErrorBoundary(validateTableName),
        asyncErrorBoundary(validateCapacity),
        asyncErrorBoundary(create)
    ]
}