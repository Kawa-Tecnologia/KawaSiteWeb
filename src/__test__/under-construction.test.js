import React from 'react';
import { render, screen } from '@testing-library/react';
import UnderConstruction from '../pages/UnderConstruction';

// eslint-disable-next-line no-undef
test('renders under construction page', () => {
  render(<UnderConstruction />);
  const pageTitle = screen.getByText(/Em Construção/i);
  // eslint-disable-next-line no-undef
  expect(pageTitle).toBeInTheDocument();
});