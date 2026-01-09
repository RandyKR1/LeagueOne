const express = require('express');
const router = express.Router({ mergeParams: true });
const { Driver, League, Team, DriverStanding, User } = require('../models');
const { validateSchema } = require('../middleware/validateSchema');
const { authenticateJWT, ensureLoggedIn, isLeagueAdmin, isTeamAdminForLeague } = require('../middleware/auth');
const schemas = {
  DriverNew: require('../schemas/DriverNew.json'),
  DriverUpdate: require('../schemas/DriverUpdate.json')
};

// GET all drivers for a league
router.get('/', authenticateJWT, ensureLoggedIn, async (req, res) => {
  const { leagueId } = req.params;
  try {
    const drivers = await Driver.findAll({
      where: { leagueId },
      include: [{ model: Team, as: 'team' }]
    });
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
});

// GET a driver by ID
router.get('/:driverId', authenticateJWT, ensureLoggedIn, async (req, res) => {
  const { leagueId, driverId } = req.params;
  try {
    const driver = await Driver.findOne({
      where: { id: driverId, leagueId },
      include: [{ model: Team, as: 'team' }]
    });
    if (!driver) return res.status(404).json({ error: 'Driver not found' });
    res.json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch driver' });
  }
});

// CREATE driver
router.post('/create', authenticateJWT, ensureLoggedIn, async (req, res) => {
  const { leagueId } = req.params;
  const userId = req.user.id;
  try {
    validateSchema(req.body, schemas.DriverNew);

    const league = await League.findByPk(leagueId);
    if (!league) return res.status(404).json({ error: 'League not found' });

    // Only league admin can create AI drivers
    if (req.body.isAI && !(await isLeagueAdmin(req, res))) {
      return res.status(403).json({ error: 'Only league admins can create AI drivers' });
    }

    // TEAM_BASED leagues require a team
    if (league.leagueType === 'TEAM_BASED' && !req.body.teamId) {
      return res.status(400).json({ error: 'Driver must belong to a team for TEAM_BASED league' });
    }

    // RACE_BASED leagues require team affiliation
    if (league.leagueType === 'RACE_BASED' && !req.body.teamId) {
      return res.status(400).json({ error: 'Driver must belong to a team for RACE_BASED league' });
    }

    const driver = await Driver.create({
      ...req.body,
      leagueId,
      userId: req.body.isAI ? null : userId
    });

    // Create DriverStanding
    await DriverStanding.create({
      driverId: driver.id,
      leagueId,
      points: 0,
      racesEntered: 0,
      wins: 0
    });

    res.status(201).json(driver);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// UPDATE driver
router.patch('/:driverId', authenticateJWT, ensureLoggedIn, async (req, res) => {
  const { leagueId, driverId } = req.params;
  try {
    validateSchema(req.body, schemas.DriverUpdate);

    const driver = await Driver.findOne({ where: { id: driverId, leagueId } });
    if (!driver) return res.status(404).json({ error: 'Driver not found' });

    // Permission check: league admin or team admin of the driver's team
    const leagueAdmin = await isLeagueAdmin(req, res);
    const teamAdmin = await isTeamAdminForLeague(req, res, driver.teamId);
    if (!leagueAdmin && !teamAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await driver.update(req.body);
    res.json(driver);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE driver
router.delete('/:driverId', authenticateJWT, ensureLoggedIn, async (req, res) => {
  const { leagueId, driverId } = req.params;
  try {
    const driver = await Driver.findOne({ where: { id: driverId, leagueId } });
    if (!driver) return res.status(404).json({ error: 'Driver not found' });

    // Permission check
    const leagueAdmin = await isLeagueAdmin(req, res);
    const teamAdmin = await isTeamAdminForLeague(req, res, driver.teamId);
    if (!leagueAdmin && !teamAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await driver.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete driver' });
  }
});

module.exports = router;
