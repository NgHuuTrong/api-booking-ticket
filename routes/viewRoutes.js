const express = require('express');
const ticketController = require('../controllers/ticketController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.get(
  '/pay/:match_id/:area/:seat/:price/:quantity',
  authController.protect,
  ticketController.createCheckoutSession,
);
router.get('/pay/success', ticketController.executeCheckout);
router.get('/pay/cancel', (req, res) => res.render('cancel'));

module.exports = router;
