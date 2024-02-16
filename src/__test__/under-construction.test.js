import React from 'react';
import { render, screen } from '@testing-library/react';
import UnderConstruction from '../components/UnderConstruction';

test('renders under construction page', () => {
  render(<UnderConstruction />);
  const pageTitle = screen.getByText(/Em Construção/i);
  expect(pageTitle).toBeInTheDocument();
});