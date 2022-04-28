const Transaction = require('../models/Transaction');

async function getAllTransactions(req, res) {
    try {
        const transactions = await Transaction.findAll({
            order: [['id', 'DESC']]
        });
        res.status(200).json(transactions)
    } catch (error) {
        res.status(500)
        console.log(`Unable to get transactions ${error}`)
    }
}

async function getFirstTransactions(req, res) {
    try {
        const firstTransactions = await Transaction.findAll({
            limit: 10,
            order: [['id', 'DESC']],
        })
        res.status(200).json(firstTransactions)

    } catch (error) {
        res.status(500)
        console.log(`Unable to get transactions ${error}`)
    }
}

async function getTransaction(req, res) {
    try {
        const transaction = await Transaction.findAll({
            where: {
                id: req.params.id
            }
        })
        res.status(200).json(transaction)

    } catch (error) {
        res.status(500)
        console.log(`Unable to get your transaction: ${error}`)
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

async function updateTransaction(req, res) {

    const { concept, amount, category } = req.body

    try {
        let modifyTransaction = await Transaction.update({
            concept,
            amount,
            category,
        },
        {
            where: {
                id: req.params.id
            }
        })

        if (modifyTransaction) {
            return res.status(200).json({ message: `Transaction ${req.param.id} modified successfully` })
        }

    } catch (error) {
        res.status(500).json({ message: `An error was ocurred ${error}` })
        console.log(`Unable to update the transaction ${req.params.id}: ${error}`)
    }
}

async function deleteTransaction(req, res) {
    try {
        let removeTransaction = await Transaction.destroy({
            where: {
                id: req.params.id
            }
        })

        if (removeTransaction) {
            res.status(200).json({
                message:`Transaction ${req.param.id} removed successfully`,
                data: removeTransaction
            })
        }
    } catch (error) {
        res.status(500).json({ message: `An error was ocurred ${error}` })
        console.log(`Unable to delete the transaction ${req.params.id}: ${error}`)
    }
}


module.exports = {
    addTransaction,
    getAllTransactions,
    getFirstTransactions,
    getTransaction,
    updateTransaction,
    deleteTransaction
};