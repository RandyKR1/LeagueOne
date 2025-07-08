import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TeamUpdateForm from '../Teams/TeamUpdateForm';

jest.mock('../api', () => ({
    getTeamById: jest.fn(() => Promise.resolve({})),
    updateTeam: jest.fn(() => Promise.resolve({}))
}));

test('TeamUpdateForm renders without crashing', () => {
  render(
    <MemoryRouter>
      <TeamUpdateForm />
    </MemoryRouter>
  );
});
