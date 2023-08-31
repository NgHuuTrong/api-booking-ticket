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

// const models = initModels(sequelize);

sequelize
  .sync()
  .then(() => {
    // const stadiums = JSON.parse(fs.readFileSync(`${__dirname}/stadium.json`));
    const clubs = JSON.parse(fs.readFileSync(`${__dirname}/club.json`));

    const importData = async () => {
      try {
        await Stadium.create({
          stadium_id: 1,
          address: '123 Arsenal Street, London',
          capacity: 60361,
          name: 'Emirates Stadium',
          location: 'London',
        });
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
