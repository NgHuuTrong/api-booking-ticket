const _sequelize = require('sequelize');
const sequelize = require('../utils/database');

const News = sequelize.define(
    'news',
    {
        news_id: {
            autoIncrement: true,
            type: _sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: _sequelize.STRING(200),
            allowNull: true,
        },
        thumbnail: {
            type: _sequelize.STRING(150),
            allowNull: false,
        },
        url: {
            type: _sequelize.STRING(150),
            allowNull: true,
        },
        type: {
            type: _sequelize.ENUM('article', 'video'),
            allowNull: false,
        }
    },
    {
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [{ name: 'news_id' }],
            }
        ],
    },
);

module.exports = News;
