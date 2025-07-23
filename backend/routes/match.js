const express = require('express');
const router = express.Router({ mergeParams: true });
const { Match, League, Team, Standing } = require('../models');
const { validateSchema } = require('../middleware/validateSchema');
const { authenticateJWT, ensureLoggedIn, isLeagueAdmin } = require('../middleware/auth');
const StandingsService = require('../helpers/updateStandings');


const schemas = {
  MatchNew: require('../schemas/MatchNew.json'),
  MatchUpdate: require('../schemas/MatchUpdate.json')
};


/* Get all matches for a league */
router.get('/', authenticateJWT, ensureLoggedIn, async (req, res) => {
  const { leagueId } = req.params;
  try {
    const league = await League.findByPk(leagueId, {
      include: [{
        model: Match,
        as: 'matches',
        include: [
          { model: Team, as: 'homeTeam', attributes: ['id', 'name'] },
          { model: Team, as: 'awayTeam', attributes: ['id', 'name'] },
        ],
        attributes: ['id', 'leagueId', 'eventType', 'eventLocation', 'team1', 'team2', 'team1Score', 'team2Score'],
      }],
    });

    if (league) {
      res.status(200).json(league.matches);
    } else {
      res.status(404).json({ error: 'League not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


/* Get match by ID */
router.get('/:matchId', authenticateJWT, ensureLoggedIn, async (req, res) => {
  const { leagueId, matchId } = req.params;
  try {
    const match = await Match.findOne({
      where: { id: matchId, leagueId },
      include: [
        { model: Team, as: 'homeTeam', attributes: ['id', 'name'] },
        { model: Team, as: 'awayTeam', attributes: ['id', 'name'] },
        { model: League, as: 'league', attributes: ['adminId', 'name']},
      ],
      attributes: ['id', 'leagueId', 'eventType', 'eventLocation', 'team1', 'team2', 'team1Score', 'team2Score'],
    });

    if (match) {
      res.status(200).json(match);
    } else {
      res.status(404).json({ error: 'Match not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


/* Create a new match */
router.post('/create', authenticateJWT, ensureLoggedIn, isLeagueAdmin, async (req, res) => {
  const { leagueId } = req.params;
  try {
    validateSchema(req.body, schemas.MatchNew);

    const { eventLocation, eventType, team1, team2, team1Score, team2Score } = req.body;

    if (team1 === team2) {
      return res.status(400).json({ error: 'A team cannot play against itself' });
    }

    const match = await Match.create({
      leagueId,
      eventType,
      eventLocation,
      team1,
      team2,
      team1Score,
      team2Score
    });

    await StandingsService.updateStandings(match);
    

    res.status(201).json({ match });
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
});


/* Update a match */
router.put('/:matchId', authenticateJWT, ensureLoggedIn, isLeagueAdmin, async (req, res) => {
  const { leagueId, matchId } = req.params;
  try {
    validateSchema(req.body, schemas.MatchUpdate);
    const match = await Match.findOne({
      where: { id: matchId, leagueId }
    });

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    await StandingsService.reverseStandings(match);
    await match.update(req.body);
    await StandingsService.updateStandings(match);

    res.status(200).json(match);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


/* Delete a match */
router.delete('/:matchId', authenticateJWT, ensureLoggedIn, isLeagueAdmin, async (req, res) => {
  const { leagueId, matchId } = req.params;

  try {
    const match = await Match.findOne({
      where: { id: matchId, leagueId }
    });

    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }

    await StandingsService.reverseStandings(match);
    await match.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting match:', error);
    res.status(400).json({ error: error.message });
  }
});


module.exports = router;
