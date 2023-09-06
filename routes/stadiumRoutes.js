const express = require('express');
const stadiumController = require('../controllers/stadiumController');

const router = express.Router();

router
  .route('/')
  .get(stadiumController.getALlStadium)
  .post(stadiumController.createStadium);
router
  .route('/:id')
  .get(stadiumController.getStadium)
  .patch(stadiumController.updateStadium)
  .delete(stadiumController.deleteStadium);

module.exports = router;
