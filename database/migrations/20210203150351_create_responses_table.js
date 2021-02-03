
exports.up = function(knex) {
    return knex.schema.createTable("responses", (table) => {
        table.increments("id");
        table.integer("question_id").unsigned().notNullable();
        table.string("response").notNullable();
        table.boolean("isCorrect").notNullable();

        table.foreign("question_id").references("id").inTable("questions");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("responses");
};
