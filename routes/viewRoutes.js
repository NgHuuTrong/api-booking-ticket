const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router.get('/', (req, res) => res.render('index'));
router.get('/pay', ticketController.createCheckoutSession);
router.get('/pay/success', ticketController.executeCheckout);
router.get('/pay/cancel', (req, res) => res.send('Cancelled'));

module.exports = router;
