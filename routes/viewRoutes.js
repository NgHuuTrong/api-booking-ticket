const express = require('express');
const ticketController = require('../controllers/ticketController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.get(
  '/pay/:match_id/:payer_name/:payer_email/:payer_phone/:area/:quantity',
  authController.protect,
  ticketController.createCheckoutSession,
);
router.get('/pay/execute', ticketController.executeCheckout);
router.get('/pay/success', ticketController.getPaySuccess);
router.get('/pay/cancel', (req, res) => res.render('cancel'));

module.exports = router;
