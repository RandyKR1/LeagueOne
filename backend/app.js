const express = require('express');
const app = express();
const cors = require('cors');
const { NotFoundError, BadRequestError, UnauthorizedError } = require("./expressError");
require('dotenv').config({ path: '../.env' });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require('./routes/user');
const teamRoutes = require('./routes/team');
const leagueRoutes = require('./routes/league');
const matchRoutes = require('./routes/match');
const authRoutes = require('./routes/auth'); // Import authRoutes

app.use('/auth', authRoutes); 
app.use('/users', userRoutes);
app.use('/teams', teamRoutes);
app.use('/leagues', leagueRoutes);
app.use('/leagues/:leagueId/matches', matchRoutes);


// Handle 404 - Route not found
app.use((req, res, next) => {
  return next(new NotFoundError());
});

// Generic error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  return res.status(status).json({
    error: {
      message: err.message || "Internal Server Error",
      status
    }
  });
});

module.exports = app;


