const dotenv = require('dotenv');

// Errors outside Express: Uncaught exception
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');

  // Give server basically time to finish all request that are still pending or being handled at this time, and after then kill it
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const sequelize = require('./utils/database');
const app = require('./app');

const Stadium = require('./models/stadium.js');
const Club = require('./models/club.js');
const Footballer = require('./models/footballer.js');
const Group = require('./models/group.js');
const GroupClub = require('./models/groupClub.js');
const Match = require('./models/match.js');
const Ticket = require('./models/ticket.js');
const User = require('./models/user.js');
const News = require('./models/news.js');

Footballer.belongsTo(Club, { as: 'club', foreignKey: 'club_id' });
Club.hasMany(Footballer, { as: 'footballers', foreignKey: 'club_id' });
GroupClub.belongsTo(Club, { as: 'club', foreignKey: 'club_id' });
Club.hasOne(GroupClub, {
  as: 'group_club',
  foreignKey: 'club_id',
});
Match.belongsTo(Club, { as: 'home_club', foreignKey: 'home_club_id' });
Club.hasMany(Match, { as: 'matches', foreignKey: 'home_club_id' });
Match.belongsTo(Club, { as: 'away_club', foreignKey: 'away_club_id' });
Club.hasMany(Match, { as: 'away_club_matches', foreignKey: 'away_club_id' });
GroupClub.belongsTo(Group, {
  as: 'group',
  foreignKey: 'group_id',
});
Group.hasMany(GroupClub, {
  as: 'group_clubs',
  foreignKey: 'group_id',
});
Ticket.belongsTo(Match, { as: 'match', foreignKey: 'match_id' });
Match.hasMany(Ticket, { as: 'tickets', foreignKey: 'match_id' });
Club.belongsTo(Stadium, { as: 'stadium', foreignKey: 'stadium_id' });
Stadium.hasMany(Club, { as: 'clubs', foreignKey: 'stadium_id' });
Match.belongsTo(Stadium, { as: 'stadium', foreignKey: 'stadium_id' });
Stadium.hasMany(Match, { as: 'matches', foreignKey: 'stadium_id' });
Ticket.belongsTo(User, { as: 'U', foreignKey: 'user_id' });
User.hasMany(Ticket, { as: 'tickets', foreignKey: 'user_id' });

sequelize
  .sync({ force: true })
  //.sync()
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`App running on port ${port}...`);
    });
  })
  .catch((err) => console.log(err));

// Errors outside Express: Unhandle Rejection
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLE REJECTION! 💥 Shutting down...');

  // Give server basically time to finish all request that are still pending or being handled at this time, and after then kill it
  server.close(() => {
    process.exit(1);
  });
});
