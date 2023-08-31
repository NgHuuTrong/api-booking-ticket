// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');
dotenv.config({ path: '../../config.env' });

const sequelize = require('../../utils/database');

const fs = require('fs');

const Stadium = require('../../models/stadium.js');
const Club = require('../../models/club.js');
const Footballer = require('../../models/footballer.js');
const Group = require('../../models/group.js');
const GroupClub = require('../../models/groupClub.js');
const Match = require('../../models/match.js');
const Ticket = require('../../models/ticket.js');
const User = require('../../models/user.js');

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

// const models = initModels(sequelize);

sequelize
  .sync()
  .then(() => {
    const stadiums = JSON.parse(fs.readFileSync(`${__dirname}/stadium.json`));
    const clubs = JSON.parse(fs.readFileSync(`${__dirname}/club.json`));

    const importData = async () => {
      try {
        await Stadium.bulkCreate(stadiums);
        await Club.bulkCreate(clubs);
        console.log('Data imported successfully');
      } catch (err) {
        console.log(err);
      }
      process.exit();
    };

    const deleteData = async () => {
      try {
        // await Tour.deleteMany();
        // await User.deleteMany();
        // await Review.deleteMany();
        console.log('Data deleted successfully');
      } catch (err) {
        console.log(err);
      }
      process.exit();
    };

    if (process.argv[2] === '--import') {
      importData();
    } else if (process.argv[2] === '--delete') {
      deleteData();
    }
  })
  .catch((err) => console.log(err));

// const models = initModels(sequelize);

// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`));

console.log(process.argv);
