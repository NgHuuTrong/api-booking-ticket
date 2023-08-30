import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _club from  "./club.js";
import _footballer from  "./footballer.js";
import _group_table from  "./group_table.js";
import _grouptable_club from  "./grouptable_club.js";
import _match from  "./match.js";
import _stadium from  "./stadium.js";
import _ticket from  "./ticket.js";
import _user from  "./user.js";

export default function initModels(sequelize) {
  const club = _club.init(sequelize, DataTypes);
  const footballer = _footballer.init(sequelize, DataTypes);
  const group_table = _group_table.init(sequelize, DataTypes);
  const grouptable_club = _grouptable_club.init(sequelize, DataTypes);
  const match = _match.init(sequelize, DataTypes);
  const stadium = _stadium.init(sequelize, DataTypes);
  const ticket = _ticket.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);

  footballer.belongsTo(club, { as: "club", foreignKey: "club_id"});
  club.hasMany(footballer, { as: "footballers", foreignKey: "club_id"});
  grouptable_club.belongsTo(club, { as: "club", foreignKey: "club_id"});
  club.hasOne(grouptable_club, { as: "grouptable_club", foreignKey: "club_id"});
  match.belongsTo(club, { as: "home_club", foreignKey: "home_club_id"});
  club.hasMany(match, { as: "matches", foreignKey: "home_club_id"});
  match.belongsTo(club, { as: "away_club", foreignKey: "away_club_id"});
  club.hasMany(match, { as: "away_club_matches", foreignKey: "away_club_id"});
  grouptable_club.belongsTo(group_table, { as: "group_table", foreignKey: "group_table_id"});
  group_table.hasMany(grouptable_club, { as: "grouptable_clubs", foreignKey: "group_table_id"});
  ticket.belongsTo(match, { as: "match", foreignKey: "match_id"});
  match.hasMany(ticket, { as: "tickets", foreignKey: "match_id"});
  club.belongsTo(stadium, { as: "stadium", foreignKey: "stadium_id"});
  stadium.hasMany(club, { as: "clubs", foreignKey: "stadium_id"});
  match.belongsTo(stadium, { as: "stadium", foreignKey: "stadium_id"});
  stadium.hasMany(match, { as: "matches", foreignKey: "stadium_id"});
  ticket.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(ticket, { as: "tickets", foreignKey: "user_id"});

  return {
    club,
    footballer,
    group_table,
    grouptable_club,
    match,
    stadium,
    ticket,
    user,
  };
}
