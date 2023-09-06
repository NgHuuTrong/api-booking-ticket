const db = require('../utils/database');
const factory = require('./handleFactory');

exports.getALlStadium = factory.getAll(db.stadia);

exports.getStadium = factory.getOne(db.stadia);

exports.createStadium = factory.createOne(db.stadia);

exports.updateStadium = factory.updateOne(db.stadia);

exports.deleteStadium = factory.deleteOne(db.stadia);
