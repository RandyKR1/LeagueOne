'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('TeamLeagues', [
      {
        teamId: 1,  // your first seeded team
        leagueId: 1, // your first seeded league
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        teamId: 2,  // your second seeded team
        leagueId: 1, // same league
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('TeamLeagues', null, {});
  }
};
