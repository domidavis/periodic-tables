const knex = require("../db/connection");

async function list() {
    return knex("tables")
    .select("*")
    .orderBy("table_name");
}

async function read(table_id) {
    return knex("tables")
    .select("*")
    .where({"table_id": table_id})
    .first();
}

async function create(table) {
    return knex("tables")
    .insert(table)
    .returning("*").then((createdRecord) => createdRecord[0]);
}

async function seat(tableId, resId) {
    console.log(tableId, resId)
    return knex("reservations")
    .where({"reservation_id": resId})
    .update({"status": "seated"})
    .then(() => {
        return knex("tables")
        .where({"table_id": tableId})
        .update({"status": "occupied", "reservation_id": resId})

    })
}

async function unseat(table_id, reservation_id) {
    return knex("reservations")
    .where({ "reservation_id": reservation_id })
    .update({ "status": "finished" })
    .returning("*")
    .then(() => {
        return knex("tables")
            .select("*")
            .where({ "table_id": table_id })
            .update({ "status": "free", "reservation_id": knex.raw("DEFAULT") })
    });
}
module.exports = {
    list,
    read,
    create,
    seat,
    unseat
}