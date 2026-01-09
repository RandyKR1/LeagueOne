const express = require('express');
const router = express.Router({ mergeParams: true });
const { DriverStanding, Driver, League } = require('../models');
const { authenticateJWT, ensureLoggedIn, isLeagueAdmin } = require('../middleware/auth');

// GET all driver standings for a league
router.get('/', authenticateJWT, ensureLoggedIn, async (req, res) => {
  const { leagueId } = req.params;
  try {
    const standings = await DriverStanding.findAll({
      where: { leagueId },
      include: [{ model: Driver, as: 'driver' }],
      order: [['points', 'DESC']]
    });
    res.json(standings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch driver standings' });
  }
});

// PATCH manual update (optional, admin-only)
router.patch('/:standingId', authenticateJWT, ensureLoggedIn, isLeagueAdmin, async (req, res) => {
  const { leagueId, standingId } = req.params;
  try {
    const standing = await DriverStanding.findOne({ where: { id: standingId, leagueId } });
    if (!standing) return res.status(404).json({ error: 'Standing not found' });

    await standing.update(req.body);
    res.json(standing);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
