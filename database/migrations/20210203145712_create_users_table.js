
exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("id");
        table.string("firstname");
        table.string("lastname");
        table.string("email").unique().notNullable();
        table.string("password").notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("users");
};
