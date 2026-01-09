'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Drivers', [
      {
        name: 'AI Driver 1',
        teamId: 1,   // Make sure this team exists
        leagueId: 1, // Make sure this league exists
        userId: null, // AI driver, not linked to a user
        isAI: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'AI Driver 2',
        teamId: 2,
        leagueId: 1,
        userId: null,
        isAI: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Drivers', null, {});
  }
};
