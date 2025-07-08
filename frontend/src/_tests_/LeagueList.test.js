import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LeagueList from '../Leagues/LeagueList';

jest.mock('../api', () => ({
    getLeagues: jest.fn(() => Promise.resolve([]))
}));

test('LeagueList renders without crashing', () => {
  render(
    <MemoryRouter>
      <LeagueList />
    </MemoryRouter>
  );
});

