'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const standingsData = [
      { leagueId: 1, teamId: 1, points: 0, wins: 0, losses: 0, draws: 0, createdAt: new Date(), updatedAt: new Date() },
      { leagueId: 1, teamId: 2, points: 0, wins: 0, losses: 0, draws: 0, createdAt: new Date(), updatedAt: new Date() },
      // Add more teams/leagues as needed
    ];

    return queryInterface.bulkInsert('Standings', standingsData);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Standings', null, {});
  }
};
