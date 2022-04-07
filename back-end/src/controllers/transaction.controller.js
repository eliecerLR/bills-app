const Transaction = require('../models/Transaction');

async function getTransactions(req, res) {
    try {
        const transactions = await Transaction.findAll();
        res.status(200).json({ data: transactions })
    } catch (error) {
        res.status(500)
        console.log(`Unable to get transactions ${error}`)
    }
}

async function addTransaction(req, res) {
    const { concept, type, amount, category } = req.body;

    try {
        let newTransaction = await Transaction.create({
            concept,
            type,
            amount,
            category
        })

        if (newTransaction) {
            return res.status(200).json({
                message: 'Transaction Succesfully registered',
                data: newTransaction
            })
        }
    } catch (error) {
        res.status(500)
        console.error(`An error ocurred ${error}`)
    }
}


module.exports = {
    addTransaction,
    getTransactions
};