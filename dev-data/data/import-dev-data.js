// eslint-disable-next-line import/no-extraneous-dependencies
import { Sequelize } from 'sequelize';
import { config } from 'dotenv';
import { readFileSync } from 'fs';
// import Stadium from '../../models/stadium.js';

config({ path: '../../config.env' });

const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        port: process.env.DATABASE_PORT,
    }
);

sequelize.sync();

const models = initModels(sequelize);

const stadiums = JSON.parse(readFileSync(`${__dirname}/stadium.json`));
// const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`));
// const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`));

const importData = async () => {
    try {
        await models.stadium.create({
            stadium_id: 1,
            address: "123 Arsenal Street, London",
            capacity: 60361,
            name: "Emirates Stadium",
            location: "London"
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

console.log(process.argv);
