'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('DriverStandings', [
      {
        driverId: 1, // first driver
        leagueId: 1, // corresponding league
        points: 0,
        position: null,
        wins: 0,
        podiums: 0,
        racesCompleted: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        driverId: 2, // second driver
        leagueId: 1,
        points: 0,
        position: null,
        wins: 0,
        podiums: 0,
        racesCompleted: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add more drivers as needed
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('DriverStandings', null, {});
  }
};
