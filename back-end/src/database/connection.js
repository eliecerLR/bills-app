const { Sequelize } = require ('sequelize');

const sequelize = new Sequelize ('mybills_db', 'mybills_admin', 'thebillsguy123', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;