import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

test('renders UserBalances page as first page', () => {
  render(<App />);
  const navHeader = screen.getByText(/Dashboard/i);
  expect(navHeader).toBeInTheDocument();
  const userBalances = screen.getByText(/User Balances/i);
  expect(userBalances).toBeInTheDocument();
});
