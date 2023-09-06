const express = require('express');
const stadiumController = require('../controllers/stadiumController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(stadiumController.getALlStadium)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    stadiumController.createStadium,
  );
router
  .route('/:id')
  .get(stadiumController.getStadium)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    stadiumController.updateStadium,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    stadiumController.deleteStadium,
  );

module.exports = router;
