import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserList from '../Users/UserList';

jest.mock('../api', () => ({
    getUsers: jest.fn(() => Promise.resolve([]))
}));

test('UserList renders without crashing', () => {
  render(
    <MemoryRouter>
      <UserList />
    </MemoryRouter>
  );
});
