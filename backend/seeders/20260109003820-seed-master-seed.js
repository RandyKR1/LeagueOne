'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Import each seeder module
    const seedUsers = require('./20260108211538-seed-users');
    const seedTeams = require('./20260108213145-seed-teams');
    const seedTeamPlayers = require('./20260108213858-seed-team-players');
    const seedLeagues = require('./20260108215535-seed-leagues');
    const seedTeamLeagues = require('./20260108223729-seed-team-leagues');
    const seedMatches = require('./20260108230158-seed-matches');
    const seedDrivers = require('./20260108233248-seed-drivers');
    const seedRaces = require('./20260108232050-seed-races');
    const seedRaceResults = require('./20260108232840-seed-race-results');
    const seedDriverStandings = require('./20260108235054-seed-driver-standings');
    const seedStandings = require('./20260109002442-seed-standings');
    const seedMatchLeague = require('./20260109002658-seed-match-league');
    const seedMatchTeams = require('./20260109003300-seed-match-teams');

    // Run each seeder in order
    await seedUsers.up(queryInterface, Sequelize);
    await seedTeams.up(queryInterface, Sequelize);
    await seedTeamPlayers.up(queryInterface, Sequelize);
    await seedLeagues.up(queryInterface, Sequelize);
    await seedTeamLeagues.up(queryInterface, Sequelize);
    await seedMatches.up(queryInterface, Sequelize);
    await seedDrivers.up(queryInterface, Sequelize);
    await seedRaces.up(queryInterface, Sequelize);
    await seedRaceResults.up(queryInterface, Sequelize);
    await seedDriverStandings.up(queryInterface, Sequelize);
    await seedStandings.up(queryInterface, Sequelize);
    await seedMatchLeague.up(queryInterface, Sequelize);
    await seedMatchTeams.up(queryInterface, Sequelize);
  },

  async down(queryInterface, Sequelize) {
    // Reverse in opposite order to handle foreign keys
    const seedMatchTeams = require('./20260109003300-seed-match-teams');
    const seedMatchLeague = require('./20260109002658-seed-match-league');
    const seedStandings = require('./20260109002442-seed-standings');
    const seedDriverStandings = require('./20260108235054-seed-driver-standings');
    const seedRaceResults = require('./20260108232840-seed-race-results');
    const seedRaces = require('./20260108232050-seed-races');
    const seedDrivers = require('./20260108233248-seed-drivers');
    const seedMatches = require('./20260108230158-seed-matches');
    const seedTeamLeagues = require('./20260108223729-seed-team-leagues');
    const seedLeagues = require('./20260108215535-seed-leagues');
    const seedTeamPlayers = require('./20260108213858-seed-team-players');
    const seedTeams = require('./20260108213145-seed-teams');
    const seedUsers = require('./20260108211538-seed-users');

    // Run down methods in reverse order
    await seedMatchTeams.down(queryInterface, Sequelize);
    await seedMatchLeague.down(queryInterface, Sequelize);
    await seedStandings.down(queryInterface, Sequelize);
    await seedDriverStandings.down(queryInterface, Sequelize);
    await seedRaceResults.down(queryInterface, Sequelize);
    await seedRaces.down(queryInterface, Sequelize);
    await seedDrivers.down(queryInterface, Sequelize);
    await seedMatches.down(queryInterface, Sequelize);
    await seedTeamLeagues.down(queryInterface, Sequelize);
    await seedLeagues.down(queryInterface, Sequelize);
    await seedTeamPlayers.down(queryInterface, Sequelize);
    await seedTeams.down(queryInterface, Sequelize);
    await seedUsers.down(queryInterface, Sequelize);
  },
};
