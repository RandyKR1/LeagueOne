'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Matches', [
      {
        leagueId: 1,         // your first seeded league
        eventType: 'Friendly',
        eventLocation: 'Stadium A',
        team1: 1,            // first seeded team
        team2: 2,            // second seeded team
        team1Score: 3,
        team2Score: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        leagueId: 1,
        eventType: 'Friendly',
        eventLocation: 'Stadium B',
        team1: 2,
        team2: 1,
        team1Score: 1,
        team2Score: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Matches', null, {});
  }
};
