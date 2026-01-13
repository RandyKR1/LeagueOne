const { RaceResult, DriverStanding, Race, League } = require('../models');

/**
 * Calculate points for a single race result
 */
function calculatePoints(scoringSystem, position, status) {
  if (status !== 'CLASSIFIED' || !position) return 0;
  return scoringSystem?.[position] ?? 0;
}

/**
 * Recalculate standings for ONE driver in ONE league
 * This avoids point drift and handles edits/deletes safely
 */
async function updateStandings(leagueId, driverId) {
  const league = await League.findByPk(leagueId);
  if (!league) return;

  const results = await RaceResult.findAll({
    where: { driverId },
    include: [{
      model: Race,
      as: 'race',
      where: { leagueId }
    }]
  });

  let points = 0;
  let wins = 0;
  let podiums = 0;
  let racesCompleted = 0;

  for (const result of results) {
    if (result.status === 'CLASSIFIED') {
      racesCompleted++;
      const pos = result.position;
      points += league.scoringSystem?.[pos] ?? 0;
      if (pos === 1) wins++;
      if (pos <= 3) podiums++;
    }
  }

  const [standing] = await DriverStanding.findOrCreate({
    where: { leagueId, driverId },
    defaults: { points: 0 }
  });

  await standing.update({
    points,
    wins,
    podiums,
    racesCompleted
  });
}

module.exports = {
  calculatePoints,
  updateStandings
};
