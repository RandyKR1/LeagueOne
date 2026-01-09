'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Leagues', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      maxTeams: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      competition: {
        type: Sequelize.ENUM(
          'Soccer', 'Football', 'Hockey', 'Basketball',
          'Tennis', 'Golf', 'Baseball', 'Other'
        ),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      adminId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      firstPlacePoints: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      secondPlacePoints: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      drawPoints: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
    await queryInterface.dropTable('Leagues');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Leagues_competition";'); 
  }
};
