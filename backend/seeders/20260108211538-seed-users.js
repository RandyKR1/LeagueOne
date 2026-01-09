'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'adminuser',
          password: '$2b$12$C1XcF5FQnF9E3tY1zQzOQeG1N7R6YQpZ9n3U8ZQY5Qk5qYQy5jW4S',
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@example.com',
          isLeagueAdmin: true,
          isTeamAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          username: 'regularuser',
          password: '$2b$12$C1XcF5FQnF9E3tY1zQzOQeG1N7R6YQpZ9n3U8ZQY5Qk5qYQy5jW4S',
          firstName: 'Regular',
          lastName: 'User',
          email: 'user@example.com',
          isLeagueAdmin: false,
          isTeamAdmin: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', {
      username: ['adminuser', 'regularuser']
    });
  }
};
