'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Races', [
      {
        leagueId: 1,           // first seeded league
        name: 'Grand Prix 1',
        round: 1,
        date: new Date('2026-01-15T10:00:00Z'),
        location: 'Monaco',
        status: 'Scheduled',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        leagueId: 1,
        name: 'Grand Prix 2',
        round: 2,
        date: new Date('2026-01-22T10:00:00Z'),
        location: 'Silverstone',
        status: 'Scheduled',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Races', null, {});
  }
};
