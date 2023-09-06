const express = require('express');
const clubController = require('../controllers/clubController');

const router = express.Router();

router.get('/:id/line-up', clubController.getClubLineUp);

router
  .route('/')
  .get(clubController.getALlClub)
  .post(clubController.createClub);
router
  .route('/:id')
  .get(clubController.getClub)
  .patch(clubController.updateClub)
  .delete(clubController.deleteClub);

module.exports = router;
