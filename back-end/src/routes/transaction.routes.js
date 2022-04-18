const { Router } = require('express');
const { addTransaction, getAllTransactions, getFirstTransactions } = require('../controllers/transaction.controller');
const router = Router();

router.get('/transactions', getAllTransactions);

router.get('/last-transactions', getFirstTransactions)


router.post('/transaction', addTransaction)

module.exports = router;