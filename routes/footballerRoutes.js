const express = require('express');
const footballerController = require('../controllers/footballerController');

const router = express.Router();

router
  .route('/')
  .get(footballerController.getALlFootballer)
  .post(footballerController.createFootballer);
router
  .route('/:id')
  .get(footballerController.getFootballer)
  .patch(footballerController.updateFootballer)
  .delete(footballerController.deleteFootballer);

module.exports = router;
