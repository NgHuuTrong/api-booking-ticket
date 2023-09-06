const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();
router.get('/my-tickets', userController.getMyTickets);

router
  .route('/')
  .get(userController.getALlUser)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe,
);

router.delete('/me', userController.getMe, userController.getUser);

router.delete('/deleteMe', userController.deleteMe);

module.exports = router;
