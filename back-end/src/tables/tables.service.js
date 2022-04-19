const knex = require("../db/connection");

async function list() {
    return knex("tables as t")
    .select("*")
    .orderBy("table_name");
}
async function create(table) {
    return knex("tables")
    .insert(table)
    .returning("*").then((createdRecord) => createdRecord[0]);
}

module.exports = {
    list,
    create
}