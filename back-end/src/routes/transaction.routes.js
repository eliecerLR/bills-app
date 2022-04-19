const { Router } = require('express');
const { addTransaction, getAllTransactions, getFirstTransactions, getTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction.controller');
const router = Router();

router.get('/transactions', getAllTransactions);

router.get('/last-transactions', getFirstTransactions)

router.get('/transaction/:id', getTransaction)

router.post('/transaction/add', addTransaction)

router.put('/transaction/modify/:id', updateTransaction)

router.delete('/transaction/remove/:id', deleteTransaction)

module.exports = router;