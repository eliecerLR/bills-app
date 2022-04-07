const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const Transaction = sequelize.define('transaction', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    concept: {
        type: Sequelize.TEXT,
    },
    type: {
        type: Sequelize.BOOLEAN,
    },
    amount: {
        type: Sequelize.DECIMAL,
    },
    category: {
        type: Sequelize.TEXT,
    },
    date: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    }
    
}, {
    timestamps: false
})

module.exports = Transaction;