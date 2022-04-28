const { Sequelize } = require ('sequelize');

const sequelize = new Sequelize ('mybills_db', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;