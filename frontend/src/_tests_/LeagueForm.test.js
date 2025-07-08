import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LeagueForm from '../Leagues/LeagueForm';

jest.mock('../api', () => ({
    createLeague: jest.fn(() => Promise.resolve({}))
}));

test('LeagueForm renders without crashing', () => {
  render(
    <MemoryRouter>
      <LeagueForm />
    </MemoryRouter>
  );
});

