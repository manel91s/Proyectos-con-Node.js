const Sequelize = require('sequelize');
const sequelize = new Sequelize('uptasknode', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  operatorsAliases: false,
  define: {
    timestamps: false
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // SQLite only
  storage: 'path/to/database.sqlite'
});

// Or you can simply use a connection uri