const express = require('express');
const groupController = require('../controllers/groupController');

const router = express.Router();

router
  .route('/')
  .get(groupController.getALlGroup)
  .post(groupController.createGroup);
router
  .route('/:id')
  .get(groupController.getGroup)
  .patch(groupController.updateGroup)
  .delete(groupController.deleteGroup);

module.exports = router;
