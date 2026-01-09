'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('MatchLeagues', [
      { matchId: 1, leagueId: 1, createdAt: new Date(), updatedAt: new Date() },
      { matchId: 2, leagueId: 1, createdAt: new Date(), updatedAt: new Date() },
      // Add more match-league links if needed
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('MatchLeagues', null, {});
  }
};
