// Update with your config settings.

const Path = require('path');

module.exports.dbConfig = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'root',
      database: 'node_api'
    },
    migrations: {
        tableName: 'migrations',
        directory: Path.join(__dirname, "database/migrations")
    },
    seeds: {
        directory: Path.join(__dirname, "database/seeds")
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'node_api'
    },
    migrations: {
        tableName: 'migrations',
        directory: Path.join(__dirname, "database/migrations")
    },
    seeds: {
        directory: Path.join(__dirname, "database/seeds")
    }
  }

};
