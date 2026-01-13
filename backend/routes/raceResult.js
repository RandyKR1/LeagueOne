const express = require('express');
const router = express.Router({ mergeParams: true });
const { RaceResult, Race, Driver, League } = require('../models');
const { validateSchema } = require('../middleware/validateSchema');
const { authenticateJWT, ensureLoggedIn, isLeagueAdmin } = require('../middleware/auth');
const { calculatePoints, updateStandings } = require('../helpers/points');

const schemas = {
  RaceResultNew: require('../schemas/RaceResultNew.json'),
  RaceResultUpdate: require('../schemas/RaceResultUpdate.json')
};

// GET all results for a race
router.get('/', authenticateJWT, ensureLoggedIn, async (req, res) => {
  const { raceId } = req.params;
  try {
    const results = await RaceResult.findAll({ where: { raceId }, include: [{ model: Driver, as: 'driver' }] });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch race results' });
  }
});

// CREATE race result
router.post('/create', authenticateJWT, ensureLoggedIn, isLeagueAdmin, async (req, res) => {
  const { raceId } = req.params;
  try {
    validateSchema(req.body, schemas.RaceResultNew);

    const race = await Race.findByPk(raceId, { include: [League] });
    if (!race) return res.status(404).json({ error: 'Race not found' });

    const driver = await Driver.findByPk(req.body.driverId);
    if (!driver) return res.status(404).json({ error: 'Driver not found' });

    const points = calculatePoints(race.league.scoringSystem, req.body.position, req.body.status);

    const result = await RaceResult.create({
      raceId,
      driverId: driver.id,
      position: req.body.position,
      status: req.body.status,
      points
    });

    await updateStandings(driver.leagueId, driver.id);

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// UPDATE race result
router.patch('/:resultId', authenticateJWT, ensureLoggedIn, isLeagueAdmin, async (req, res) => {
  const { raceId, resultId } = req.params;
  try {
    validateSchema(req.body, schemas.RaceResultUpdate);

    const result = await RaceResult.findOne({
      where: { id: resultId, raceId },
      include: [{ model: Race, as: 'race' }]
    });

    await result.update(req.body);
    await updateStandings(result.race.leagueId, result.driverId);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE race result
router.delete('/:resultId', authenticateJWT, ensureLoggedIn, isLeagueAdmin, async (req, res) => {
  const { raceId, resultId } = req.params;
  try {
    const result = await RaceResult.findOne({
      where: { id: resultId, raceId },
      include: [{ model: Race, as: 'race' }]
    });

    await result.destroy();
    await updateStandings(result.race.leagueId, result.driverId);

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete race result' });
  }
});

module.exports = router;
