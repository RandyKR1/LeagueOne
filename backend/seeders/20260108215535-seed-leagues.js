'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Leagues', [
      {
        name: 'F1 Test League',
        password: null,
        maxTeams: 10,
        leagueType: 'RACE_BASED',
        competition: 'Motorsport',
        description: 'Seeded motorsport league',
        adminId: 1,

        // TEAM_BASED fields (must exist, can be null)
        firstPlacePoints: 0,
        secondPlacePoints: null,
        drawPoints: null,

        // RACE_BASED fields
        maxDriversPerTeam: 2,
        scoringSystem: JSON.stringify({
          1: 25,
          2: 18,
          3: 15,
          4: 12,
          5: 10,
          6: 8,
          7: 6,
          8: 4,
          9: 2,
          10: 1
        }),

        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Leagues', null, {});
  }
};
