const knex = require("../db/connection");

const table = "reservations";

function create(newRes) {
    return knex(table)
    .insert(newRes, "*")
    .then((res) => res[0]);
}

function list() {
    return knex(table).select("*").orderBy("reservation_time");
}

function listByDate(reservation_date) {
    return knex(table)
        .select("*")
        .where({ reservation_date })
        .orderBy("reservation_time");
}

function read(reservation_id) {
    return knex(table)
    .select("*")
    .where({ reservation_id })
    .first();
}

module.exports = {
    create,
    list,
    listByDate,
    read
};