const express = require('express');
const newsController = require('../controllers/newsController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(newsController.getALlNews)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    newsController.createNews,
  );
router
  .route('/:id')
  .get(newsController.getNews)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    newsController.updateNews,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    newsController.deleteNews,
  );

module.exports = router;
