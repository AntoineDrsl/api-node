const bcrypt = require('bcrypt');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return bcrypt.hash('password', 10).then((password) => {
        return knex('users').insert([
          {
            id: 1,
            firstname: 'John',
            lastname: 'Doe',
            email: 'admin@gmail.com',
            password: password,
            role: 'admin'
          }
        ]);
      });
    });
};
