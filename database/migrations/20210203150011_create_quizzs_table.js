
exports.up = function(knex) {
    return knex.schema.createTable("quizzs", (table) => {
        table.increments("id");
        table.string("theme").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("quizzs");
};
