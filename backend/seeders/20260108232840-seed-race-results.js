'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('RaceResults', [
      {
        raceId: 1,
        driverId: 1,
        position: 1,
        status: 'CLASSIFIED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        raceId: 1,
        driverId: 2,
        position: 2,
        status: 'CLASSIFIED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        raceId: 2,
        driverId: 1,
        position: 2,
        status: 'CLASSIFIED',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        raceId: 2,
        driverId: 2,
        position: 1,
        status: 'CLASSIFIED',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('RaceResults', null, {});
  }
};
