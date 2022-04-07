const { Router } = require('express');
const addTransaction = require('../controllers/transaction.controller');
const router = Router();

router.get('/',(req, res) =>{
    res.status(200).json({start: 'workin dude'})
})

router.post('/transaction', addTransaction)

module.exports = router;