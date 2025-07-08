import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LeagueUpdateForm from '../Leagues/LeagueUpdateForm';

jest.mock('../api', () => ({
    getLeagueById: jest.fn(() => Promise.resolve({})),
    updateLeague: jest.fn(() => Promise.resolve({}))
}));

test('LeagueUpdateForm renders without crashing', () => {
  render(
    <MemoryRouter>
      <LeagueUpdateForm />
    </MemoryRouter>
  );
});

