const db = require('../utils/database');
const factory = require('./handleFactory');

exports.getALlNews = factory.getAll(db.news);

exports.getNews = factory.getOne(db.news);

exports.createNews = factory.createOne(db.news);

exports.updateNews = factory.updateOne(db.news);

exports.deleteNews = factory.deleteOne(db.news);
