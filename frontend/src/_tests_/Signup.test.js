// src/_tests_/Signup.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignUp from '../Auth/SignUp';

jest.mock('../api', () => ({
  someMethod: jest.fn(() => Promise.resolve({}))
}));

test('renders SignUp component without crashing', () => {
  render(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>
  );
});
