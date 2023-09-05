const express = require('express');
const ticketController = require('../controllers/ticketController');

const router = express.Router();

router.route('/').get(ticketController.getALlUser);
router.route('/:id').get(ticketController.getMatch);

module.exports = router;
