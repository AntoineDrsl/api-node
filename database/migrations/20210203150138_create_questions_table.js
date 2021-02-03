
exports.up = function(knex) {
    return knex.schema.createTable("questions", (table) => {
        table.increments("id");
        table.integer("quizz_id").unsigned().notNullable();
        table.string("question").notNullable();

        table.foreign("quizz_id").references("id").inTable("quizzs");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable("questions");
};
