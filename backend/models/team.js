const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  // Define the Team model
  const Team = sequelize.define('Team', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [8, 100],
      },
    },
    maxPlayers: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 20,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    tableName: 'Teams',
    hooks: {
      beforeCreate: async (team) => {
        if (team.password) {
          team.password = await bcrypt.hash(team.password, 10);
        }
      },
      beforeUpdate: async (team) => {
        if (team.changed('password')) {
          team.password = await bcrypt.hash(team.password, 10);
        }
      },
    },
  });

  /**
   * Validate the given password against the stored hashed password.
   */
  Team.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Define associations
  Team.associate = (models) => {
    Team.belongsTo(models.User, { as: 'admin', foreignKey: 'adminId', onDelete: 'SET NULL' });

    // Users <-> Teams (players on a team)
    Team.belongsToMany(models.User, { through: 'TeamPlayers', as: 'players', foreignKey: 'teamId', onDelete: 'CASCADE' });

    // Leagues <-> Teams
    Team.belongsToMany(models.League, { through: 'TeamLeagues', as: 'leagues', foreignKey: 'teamId', onDelete: 'CASCADE' });

    // TEAM_BASED matches
    Team.hasMany(models.Match, { as: 'matches1', foreignKey: 'team1', onDelete: 'SET NULL' });
    Team.hasMany(models.Match, { as: 'matches2', foreignKey: 'team2', onDelete: 'SET NULL' });

    // Standings
    Team.hasMany(models.Standing, { as: 'standings', foreignKey: 'teamId', onDelete: 'CASCADE' });

    // RACE_BASED drivers
    Team.hasMany(models.Driver, { as: 'drivers', foreignKey: 'teamId', onDelete: 'CASCADE' });
  };

  /**
   * Find all teams with optional search filters.
   */
  Team.findAllWithFilters = async (searchFilters = {}) => {
    const where = {};
    const { name, leagueId } = searchFilters;

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    if (leagueId) {
      where.leagueId = leagueId;
    }

    const teams = await Team.findAll({ where, include: 'leagues' });
    return teams;
  };

  return Team;
};
