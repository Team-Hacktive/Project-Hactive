const Sequelize = require('sequelize')
const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost:5432/hacktive', {
    logging: false// unless you like the logs
    // ...and there are many other options you may want to play with
  }
)
module.exports = db
