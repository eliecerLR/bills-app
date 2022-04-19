const { Router } = require('express');
const { addTransaction, getAllTransactions, getFirstTransactions, getTransaction, updateTransaction } = require('../controllers/transaction.controller');
const router = Router();

router.get('/transactions', getAllTransactions);

router.get('/last-transactions', getFirstTransactions)

router.get('/transaction/:id', getTransaction)

router.post('/transaction', addTransaction)

router.put('/transaction/modify/:id', updateTransaction)

module.exports = router;