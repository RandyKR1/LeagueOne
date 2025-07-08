import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MatchForm from '../Matches/MatchForm';

jest.mock('../api', () => ({
    someMethod: jest.fn(() => Promise.resolve({}))
  }));

  test('LeagueUpdateForm renders without crashing', () => {
    render(
      <MemoryRouter>
        <MatchForm />
      </MemoryRouter>
    );
  });
