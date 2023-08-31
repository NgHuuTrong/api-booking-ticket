const Sequelize = require('sequelize');

// const sequelize = new Sequelize(
//   process.env.DATABASE_NAME,
//   process.env.USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: process.env.DATABASE_HOST,
//     dialect: process.env.DATABASE_DIALECT,
//     port: process.env.DATABASE_PORT,
//   },
// );
const sequelize = new Sequelize('node-complete', 'root', 'Trong123321', {
  host: 'localhost',
  dialect: process.env.DATABASE_DIALECT,
  port: 3306,
});

module.exports = sequelize;
