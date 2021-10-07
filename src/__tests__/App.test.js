import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders hello world', () => {
  render(<App />);
  const linkElement = screen.getByText(/hello world!/i);
  expect(linkElement).toBeInTheDocument();
});
