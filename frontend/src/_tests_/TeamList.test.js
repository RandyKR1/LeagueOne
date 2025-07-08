import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TeamList from '../Teams/TeamList';

jest.mock('../api', () => ({
    getTeams: jest.fn(() => Promise.resolve([]))
}));

test('TeamList renders without crashing', () => {
  render(
    <MemoryRouter>
      <TeamList />
    </MemoryRouter>
  );
});
