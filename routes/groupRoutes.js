const express = require('express');
const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(groupController.getALlGroup)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    groupController.createGroup,
  );
router
  .route('/:id')
  .get(groupController.getGroup)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    groupController.updateGroup,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    groupController.deleteGroup,
  );

module.exports = router;
