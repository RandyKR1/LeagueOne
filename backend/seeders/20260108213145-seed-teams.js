'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('teampassword', 10);

    await queryInterface.bulkInsert('Teams', [
      {
        name: 'Red Racing',
        password: hashedPassword,
        maxPlayers: 10,
        adminId: 1, // first seeded user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Blue Motorsport',
        password: hashedPassword,
        maxPlayers: 10,
        adminId: 2, // second seeded user
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Teams', null, {});
  }
};
