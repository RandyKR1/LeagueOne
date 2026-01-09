'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('MatchTeams', [
      { matchId: 1, teamId: 1, score: 3, createdAt: new Date(), updatedAt: new Date() },
      { matchId: 1, teamId: 2, score: 1, createdAt: new Date(), updatedAt: new Date() },
      { matchId: 2, teamId: 1, score: 2, createdAt: new Date(), updatedAt: new Date() },
      { matchId: 2, teamId: 2, score: 2, createdAt: new Date(), updatedAt: new Date() },
      // Add more match-team entries as needed
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('MatchTeams', null, {});
  }
};
