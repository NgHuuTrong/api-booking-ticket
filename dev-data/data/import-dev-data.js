// eslint-disable-next-line import/no-extraneous-dependencies
const dotenv = require('dotenv');
dotenv.config({ path: '../../config.env' });

const db = require('../../utils/database');

const fs = require('fs');

db.sequelize
  .sync({ force: true })
  .then(() => {
    const stadiums = JSON.parse(fs.readFileSync(`${__dirname}/stadium.json`));
    const clubs = JSON.parse(fs.readFileSync(`${__dirname}/club.json`));
    const footballers = JSON.parse(
      fs.readFileSync(`${__dirname}/footballers.json`),
    );
    const groups = JSON.parse(fs.readFileSync(`${__dirname}/group.json`));
    const groupClub = JSON.parse(
      fs.readFileSync(`${__dirname}/groupClub.json`),
    );
    const matches = JSON.parse(fs.readFileSync(`${__dirname}/match.json`));
    const users = JSON.parse(fs.readFileSync(`${__dirname}/user.json`));
    const tickets = JSON.parse(fs.readFileSync(`${__dirname}/tickets.json`));

    const news = JSON.parse(fs.readFileSync(`${__dirname}/news.json`));

    const importData = async () => {
      try {
        await db.stadia.bulkCreate(stadiums);
        await db.clubs.bulkCreate(clubs);
        await db.footballers.bulkCreate(footballers);
        await db.groups.bulkCreate(groups);
        await db.groupClubs.bulkCreate(groupClub);
        await db.matches.bulkCreate(matches);
        await db.users.bulkCreate(users);
        await db.news.bulkCreate(news);

        for (let i = 0; i < tickets.length; i++) {
          await db.tickets.create(tickets[i]);
        }
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
