const express = require('express');
const router = express.Router({ mergeParams: true });
const { Race, League, Team } = require('../models');
const { validateSchema } = require('../middleware/validateSchema');
const { authenticateJWT, ensureLoggedIn, isLeagueAdmin } = require('../middleware/auth');
const schemas = {
  RaceNew: require('../schemas/RaceNew.json'),
  RaceUpdate: require('../schemas/RaceUpdate.json')
};

// GET all races for league
router.get('/', authenticateJWT, ensureLoggedIn, async (req, res) => {
  const { leagueId } = req.params;
  try {
    const races = await Race.findAll({ where: { leagueId } });
    res.json(races);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch races' });
  }
});

// GET a race by ID
router.get('/:raceId', authenticateJWT, ensureLoggedIn, async (req, res) => {
  const { leagueId, raceId } = req.params;
  try {
    const race = await Race.findOne({ where: { id: raceId, leagueId } });
    if (!race) return res.status(404).json({ error: 'Race not found' });
    res.json(race);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch race' });
  }
});

// CREATE race
router.post('/create', authenticateJWT, ensureLoggedIn, isLeagueAdmin, async (req, res) => {
  const { leagueId } = req.params;
  try {
    validateSchema(req.body, schemas.RaceNew);
    const race = await Race.create({ ...req.body, leagueId });
    res.status(201).json(race);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// UPDATE race
router.patch('/:raceId', authenticateJWT, ensureLoggedIn, isLeagueAdmin, async (req, res) => {
  const { leagueId, raceId } = req.params;
  try {
    validateSchema(req.body, schemas.RaceUpdate);
    const race = await Race.findOne({ where: { id: raceId, leagueId } });
    if (!race) return res.status(404).json({ error: 'Race not found' });

    await race.update(req.body);
    res.json(race);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE race
router.delete('/:raceId', authenticateJWT, ensureLoggedIn, isLeagueAdmin, async (req, res) => {
  const { leagueId, raceId } = req.params;
  try {
    const race = await Race.findOne({ where: { id: raceId, leagueId } });
    if (!race) return res.status(404).json({ error: 'Race not found' });
    await race.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete race' });
  }
});

module.exports = router;
