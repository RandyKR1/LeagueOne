const jwt = require('jsonwebtoken');
const { User, League, Team } = require('../models');

const { JWT_SECRET } = process.env;

/**
 * Middleware to authenticate JWT tokens
 */
function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers?.authorization;

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7).trim();
      req.user = jwt.verify(token, JWT_SECRET);
      console.log('Authenticated user:', req.user);
    } else {
      req.user = null;
    }

    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Middleware to ensure user is logged in
 */
function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    console.log('Unauthorized: User not authenticated');
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }
  next();
}

/**
 * Middleware to ensure the user is a league admin
 */
async function isLeagueAdmin(req, res, next) {
  const leagueId = req.params.leagueId || req.params.id;

  if (!leagueId || !req.user) {
    return res.status(400).json({ error: 'Missing league ID or user info' });
  }

  try {
    const league = await League.findByPk(leagueId);
    if (league && league.adminId === req.user.id) {
      return next();
    }

    return res.status(403).json({ error: 'Forbidden: You must be a league admin' });
  } catch (error) {
    console.error('League admin check failed:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Middleware to ensure the user is a team admin
 */
async function isTeamAdmin(req, res, next) {
  const teamId = req.params.teamId || req.params.id;

  if (!teamId || !req.user) {
    return res.status(400).json({ error: 'Missing team ID or user info' });
  }

  try {
    const team = await Team.findByPk(teamId);
    if (team && team.adminId === req.user.id) {
      return next();
    }

    return res.status(403).json({ error: 'Forbidden: You must be a team admin' });
  } catch (error) {
    console.error('Team admin check failed:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Middleware to ensure user is admin of team provided in request body
 * (used for league join flows)
 */
async function isTeamAdminForLeagueJoin(req, res, next) {
  const { teamId } = req.body;

  if (!teamId || !req.user) {
    return res.status(400).json({ error: 'Team ID and user required' });
  }

  try {
    const team = await Team.findByPk(teamId);
    if (team && team.adminId === req.user.id) {
      return next();
    }

    return res.status(403).json({ error: 'Forbidden: You must be a team admin' });
  } catch (error) {
    console.error('Team admin (body) check failed:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  isLeagueAdmin,
  isTeamAdmin,
  isTeamAdminForLeagueJoin
};
