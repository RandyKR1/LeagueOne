import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserDetail from '../Users/UserDetail';
import UserContext from '../Auth/UserContext';

jest.mock('../api', () => ({
    getUserByUsername: jest.fn(() => Promise.resolve({})),
    deleteUser: jest.fn(() => Promise.resolve({}))
}));

test('UserDetail renders without crashing', () => {
  const currentUser = { id: 1, username: 'testuser' };
  render(
    <MemoryRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser: jest.fn() }}>
        <UserDetail />
      </UserContext.Provider>
    </MemoryRouter>
  );
});
