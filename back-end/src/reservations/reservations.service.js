const knex = require("../db/connection");

async function list(date) {
    if (date) {
        return knex("reservations as r")
        .select("*")
        .where("reservation_date", "=", date)
        .orderBy("reservation_time")

    } else {
        return knex("reservations as r")
        .select("*")
        .orderBy("reservation_date");
    }
}

async function create(reservation) {
    return knex("reservations")
    .insert(reservation);
}

module.exports = {
    list,
    create
};