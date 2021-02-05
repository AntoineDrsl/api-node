
exports.up = function(knex) {
    return knex.schema.table("users", (table) => {
        table.string('role').notNullable();
    })
};

exports.down = function(knex) {
};
