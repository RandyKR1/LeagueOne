import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LeagueJoin from '../Leagues/LeagueJoin';

jest.mock('../api', () => ({
    joinLeague: jest.fn(() => Promise.resolve({}))
}));

test('LeagueJoin renders without crashing', () => {
  render(
    <MemoryRouter>
      <LeagueJoin />
    </MemoryRouter>
  );
});

