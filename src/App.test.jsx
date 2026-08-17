import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

describe('App', () => {
  it('adds and filters customer records', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.type(screen.getByLabelText(/name/i), 'Blue Harbor Services');
    await user.type(screen.getByLabelText(/email/i), 'team@blueharbor.example');
    await user.type(screen.getByLabelText(/phone/i), '555-0177');
    await user.click(screen.getByRole('button', { name: /add customer/i }));

    expect(screen.getByText('Blue Harbor Services')).toBeInTheDocument();

    await user.type(screen.getByLabelText(/search customers/i), 'blue harbor');

    expect(screen.getByText('Blue Harbor Services')).toBeInTheDocument();
    expect(screen.queryByText('Ava Manufacturing')).not.toBeInTheDocument();
  });

  it('removes a customer record', async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByRole('button', { name: /delete northwind supply/i }));

    expect(screen.queryByText('Northwind Supply')).not.toBeInTheDocument();
  });
});