const knex = require("../db/connection");

async function list(date) {
    if (date) {
        return knex("reservations as r")
        .select("*")
        .where("reservation_date", "=", date)
        .whereNot({"status": "finished"})
        .orderBy("reservation_time");
    }
    else {
        return knex("reservations as r")
        .select("*")
        .whereNot({"status": "finished"})
        .orderBy("reservation_date");
    }
}

async function read(reservation_id) {
    console.log("reservation_id", reservation_id);
    return knex("reservations")
        .select("*")
        .where({ "reservation_id": reservation_id })
        .first();
}
async function create(reservation) {
    return knex("reservations")
    .insert(reservation)
    .returning("*").then((res) => res[0]);
}

async function setStatus(reservation_id, status) {
    return knex("reservations")
        .where({"reservation_id": reservation_id})
        .update({"status": status})
        .returning("*").then((createdRecord) => createdRecord[0]);
}

function search(mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
}

function update(updatedRes) {
    return knex("reservations")
        .select("*")
        .where({ reservation_id: updatedRes.reservation_id })
        .update(updatedRes, "*")
        .then((res) => res[0]);
}

module.exports = {
    list,
    read,
    create,
    setStatus,
    search,
    update
};