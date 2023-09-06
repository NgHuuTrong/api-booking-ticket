const { Sequelize, DataTypes, Op } = require('sequelize');
const bscrypt = require('bcryptjs');

// const sequelize = new Sequelize(
//   process.env.DATABASE_NAME,
//   process.env.USER,
//   process.env.DATABASE_PASSWORD,
//   {
//     host: process.env.DATABASE_HOST,
//     dialect: process.env.DATABASE_DIALECT,
//     port: process.env.DATABASE_PORT,
//   },
// );

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  'root',
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    port: process.env.DATABASE_PORT,
  },
);

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.stadia = require('../models/stadium.js')(sequelize, Sequelize, DataTypes);
db.clubs = require('../models/club.js')(sequelize, Sequelize, DataTypes);
db.footballers = require('../models/footballer.js')(
  sequelize,
  Sequelize,
  DataTypes,
);
db.groups = require('../models/group.js')(sequelize, Sequelize, DataTypes);
db.groupClubs = require('../models/groupClub.js')(
  sequelize,
  Sequelize,
  DataTypes,
);
db.matches = require('../models/match.js')(sequelize, Sequelize, DataTypes);
db.tickets = require('../models/ticket.js')(sequelize, Sequelize, DataTypes);
db.users = require('../models/user.js')(sequelize, Sequelize, DataTypes);
db.news = require('../models/news.js')(sequelize, Sequelize, DataTypes);

db.footballers.belongsTo(db.clubs, { as: 'club', foreignKey: 'club_id' });
db.clubs.hasMany(db.footballers, { as: 'footballers', foreignKey: 'club_id' });
db.groupClubs.belongsTo(db.clubs, { as: 'club', foreignKey: 'club_id' });
db.clubs.hasOne(db.groupClubs, {
  as: 'group_club',
  foreignKey: 'club_id',
});
db.matches.belongsTo(db.clubs, { as: 'home_club', foreignKey: 'home_club_id' });
db.clubs.hasMany(db.matches, { as: 'matches', foreignKey: 'home_club_id' });
db.matches.belongsTo(db.clubs, { as: 'away_club', foreignKey: 'away_club_id' });
db.clubs.hasMany(db.matches, {
  as: 'away_club_matches',
  foreignKey: 'away_club_id',
});
db.groupClubs.belongsTo(db.groups, {
  as: 'group',
  foreignKey: 'group_id',
});
db.groups.hasMany(db.groupClubs, {
  as: 'group_clubs',
  foreignKey: 'group_id',
});
db.tickets.belongsTo(db.matches, { as: 'match', foreignKey: 'match_id' });
db.matches.hasMany(db.tickets, { as: 'tickets', foreignKey: 'match_id' });
db.clubs.belongsTo(db.stadia, { as: 'stadium', foreignKey: 'stadium_id' });
db.stadia.hasMany(db.clubs, { as: 'clubs', foreignKey: 'stadium_id' });
db.matches.belongsTo(db.stadia, { as: 'stadium', foreignKey: 'stadium_id' });
db.stadia.hasMany(db.matches, { as: 'matches', foreignKey: 'stadium_id' });
db.tickets.belongsTo(db.users, { as: 'U', foreignKey: 'user_id' });
db.users.hasMany(db.tickets, { as: 'tickets', foreignKey: 'user_id' });

db.tickets.addHook('beforeCreate', async function (ticket, options) {
  const match = await db.matches.findByPk(ticket.match_id);

  if (match[`remain_seats_${ticket.area}`] <= 0) {
    return next(
      new AppError('This area is full! Please check for the others!', 404),
    );
  }
  match[`remain_seats_${ticket.area}`] -= 1;
  await match.save();
});

db.users.addHook('beforeSave', async (user, options) => {
  //check if user already exists
  const checkUser = await db.users.findByPk(user.user_id);

  if (!checkUser) {
    // user is signing up
    user.password = await bscrypt.hash(user.password, 12);
    user.password_confirm = undefined;
  } else if (
    !(await user.correctPassword(user.password, checkUser.password)) // user is updating password
  ) {
    user.password = await bscrypt.hash(user.password, 12);
    user.password_confirm = undefined;
    user.change_password_at = Date.now() - 1000;
  }
});

module.exports = db;
