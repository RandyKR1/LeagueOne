import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TeamJoin from '../Teams/TeamJoin';

jest.mock('../api', () => ({
    joinTeam: jest.fn(() => Promise.resolve({})),
    getTeamById: jest.fn(() => Promise.resolve({}))
}));

test('TeamJoin renders without crashing', () => {
  render(
    <MemoryRouter>
      <TeamJoin />
    </MemoryRouter>
  );
});
