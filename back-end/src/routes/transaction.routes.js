const { Router } = require('express');
const { addTransaction, getTransactions } = require('../controllers/transaction.controller');
const router = Router();

router.get('/', getTransactions)

router.post('/transaction', addTransaction)

module.exports = router;