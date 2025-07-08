import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TeamDetail from '../Teams/TeamDetail';
import UserContext from '../Auth/UserContext';

jest.mock('../api', () => ({
    getTeamById: jest.fn(() => Promise.resolve({
        id: 1,
        name: 'Test Team',
        admin: { username: 'admin', firstName: 'Admin', lastName: 'User' },
        players: [],
        leagues: [],
        maxPlayers: 10,
    })),
    deleteTeam: jest.fn(() => Promise.resolve({})),
    leaveTeam: jest.fn(() => Promise.resolve({})),
    removePlayerFromTeam: jest.fn(() => Promise.resolve({}))
}));

test('TeamDetail renders without crashing', () => {
  const currentUser = { id: 1, username: 'testuser', isTeamAdmin: true };

  render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser: jest.fn() }}>
        <TeamDetail />
      </UserContext.Provider>
    </MemoryRouter>
  );
});
