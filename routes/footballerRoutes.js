const express = require('express');
const footballerController = require('../controllers/footballerController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(footballerController.getALlFootballer)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    footballerController.createFootballer,
  );
router
  .route('/:id')
  .get(footballerController.getFootballer)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    footballerController.updateFootballer,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    footballerController.deleteFootballer,
  );

module.exports = router;
