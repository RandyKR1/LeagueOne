import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TeamForm from '../Teams/TeamForm';

jest.mock('../api', () => ({
    createTeam: jest.fn(() => Promise.resolve({}))
}));

test('TeamForm renders without crashing', () => {
  render(
    <MemoryRouter>
      <TeamForm />
    </MemoryRouter>
  );
});
