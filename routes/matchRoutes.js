const express = require('express');
const matchController = require('../controllers/matchController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(matchController.getALlMatch)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    matchController.createMatch,
  );
router
  .route('/:id')
  .get(matchController.getMatch)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    matchController.updateMatch,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    matchController.deleteMatch,
  );

module.exports = router;
