import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LeagueDetail from '../Leagues/LeagueDetail';

jest.mock('../api', () => ({
    getLeagueById: jest.fn(() => Promise.resolve({})),
    getTeamsInLeague: jest.fn(() => Promise.resolve([]))
}));

test('LeagueDetail renders without crashing', () => {
  render(
    <MemoryRouter>
      <LeagueDetail />
    </MemoryRouter>
  );
});
