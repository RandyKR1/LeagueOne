// Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserContext from '../Auth/UserContext'; // Adjust this path as needed
import Home from '../Home/Home'; // Adjust this path as needed

// Mock API utility
jest.mock('../api', () => ({
  getCurrentUser: jest.fn().mockResolvedValue({ username: 'testuser', firstName: 'Test', administeredTeams: [], administeredLeagues: [], teams: [] })
}));

describe('Home Component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ currentUser: null }}>
          <Home />
        </UserContext.Provider>
      </MemoryRouter>
    );
    // Check for basic content
    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('LeagueOne is a platform for creating and managing user-owned leagues at the press of a button.')).toBeInTheDocument();
  });
});
