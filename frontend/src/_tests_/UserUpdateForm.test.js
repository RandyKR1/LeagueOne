import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UserUpdateForm from '../Users/UserUpdateForm';

jest.mock('../api', () => ({
    getUserByUsername: jest.fn(() => Promise.resolve({})),
    updateUser: jest.fn(() => Promise.resolve({}))
}));

test('UserUpdateForm renders without crashing', () => {
  render(
    <MemoryRouter>
      <UserUpdateForm />
    </MemoryRouter>
  );
});
