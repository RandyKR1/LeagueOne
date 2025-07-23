const bcrypt = require('bcrypt');  // Import bcrypt for hashing passwords
const { Op } = require('sequelize');  // Import Sequelize operators

module.exports = (sequelize, DataTypes) => {
  // Define the League model
  const League = sequelize.define('League', {
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
    maxTeams: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    competition: {
      type: DataTypes.ENUM(
        'Soccer', 'Football', 'Hockey', 'Basketball',
        'Tennis', 'Golf', 'Baseball', 'Other'
      ),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',  // Reference to the Users model
        key: 'id',
      },
    },
    firstPlacePoints: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    secondPlacePoints: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    drawPoints: {
      type: DataTypes.INTEGER,
      allowNull: true 
    }
  }, {
    tableName: 'Leagues',
    hooks: {
      beforeCreate: async (league) => {
        if (league.password) {
          league.password = await bcrypt.hash(league.password, 10);
        }
      },
      beforeUpdate: async (league) => {
        if (league.changed('password')) {
          league.password = await bcrypt.hash(league.password, 10);
        }
      },
    }

  });

  // Define associations
  League.associate = (models) => {
    League.belongsTo(models.User, { as: 'admin', foreignKey: 'adminId', onDelete: 'CASCADE' });
    League.belongsToMany(models.Team, { through: 'TeamLeagues', as: 'teams', foreignKey: 'leagueId', onDelete: 'CASCADE' });
    League.hasMany(models.Match, { as: 'matches', foreignKey: 'leagueId', onDelete: 'CASCADE' });
    League.hasMany(models.Standing, { as: 'standings', foreignKey: 'leagueId', onDelete: 'CASCADE' });
  };

  /**
   * Get the standings for the league sorted by points in descending order.
   */
  League.prototype.getSortedStandings = async function () {
    return await this.getStandings({ order: [['points', 'DESC']] });
  };

  /**
   * Get the number of teams in the league.
   */
  League.prototype.getNumberOfTeams = async function () {
    const teams = await this.getTeams();
    return teams.length;
  };

  /**
   * Validate the given password against the hashed password stored in the database.
   */
  League.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  /**
   * Find all leagues that match the given search filters.
   */
  League.findAllWithFilters = async function (searchFilters = {}) {
    const where = {};

    const { name, maxTeams } = searchFilters;

    if (name) {
      where.name = { [Op.iLike]: `%${name}%` };
    }

    if (maxTeams) {
      where.maxTeams = { [Op.lte]: maxTeams };
    }

    return await League.findAll({ where });
  };

  return League;
};
