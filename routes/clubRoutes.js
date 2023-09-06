const express = require('express');
const clubController = require('../controllers/clubController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/:id/line-up', clubController.getClubLineUp);

router
  .route('/')
  .get(clubController.getALlClub)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    clubController.createClub,
  );
router
  .route('/:id')
  .get(clubController.getClub)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    clubController.updateClub,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    clubController.deleteClub,
  );

module.exports = router;
