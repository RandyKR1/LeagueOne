const { Op } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const DriverStanding = sequelize.define('DriverStanding', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Drivers',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    leagueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Leagues',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    wins: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    podiums: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    racesCompleted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    tableName: 'DriverStandings',
  });

  DriverStanding.associate = (models) => {
    DriverStanding.belongsTo(models.Driver, {
      foreignKey: 'driverId',
      as: 'driver',
      onDelete: 'CASCADE',
    });

    DriverStanding.belongsTo(models.League, {
      foreignKey: 'leagueId',
      as: 'league',
      onDelete: 'CASCADE',
    });
  };

  /**
   * Helper: Update points and stats after a race.
   */
  DriverStanding.prototype.updateAfterRace = async function(pointsEarned, podium = false, win = false) {
    this.points += pointsEarned;
    this.racesCompleted += 1;
    if (podium) this.podiums += 1;
    if (win) this.wins += 1;
    await this.save();
  };

  return DriverStanding;
};
