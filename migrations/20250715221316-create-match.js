'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      leagueId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Leagues',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      eventType: {
        type: Sequelize.ENUM('Friendly', 'League', 'Tournament', 'Final'),
        allowNull: false,
      },
      eventLocation: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      team1: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Teams',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      team2: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Teams',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      team1Score: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      team2Score: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matches');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Matches_eventType";');
  }
};
