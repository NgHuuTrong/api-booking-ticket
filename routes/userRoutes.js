const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();
router.get('/my-tickets', userController.getMyTickets);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.patch(
  '/updateMyPassword/:user_id',
  authController.protect,
  authController.updatePassword,
);
router.patch(
  '/updateMe',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe,
);

router.delete('/me', userController.getMe, userController.getUser);

router.delete('/deleteMe', userController.deleteMe);

router
  .route('/')
  .get(userController.getALlUser)
  .post(userController.createUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
