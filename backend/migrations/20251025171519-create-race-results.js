'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RaceResults', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      raceId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Races',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Drivers',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      points: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM('DNF', 'DNS', 'CLASSIFIED'),
        allowNull: false,
        defaultValue: 'CLASSIFIED',
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('RaceResults');
  },
};
