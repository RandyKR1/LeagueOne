import React from 'react';
import { render, } from '@testing-library/react';
import { MemoryRouter,} from 'react-router-dom';
import MatchDetail from '../Matches/MatchDetail';

jest.mock('../api', () => ({
    someMethod: jest.fn(() => Promise.resolve({}))
  }));

  test('LeagueUpdateForm renders without crashing', () => {
    render(
      <MemoryRouter>
        <MatchDetail />
      </MemoryRouter>
    );
  });
