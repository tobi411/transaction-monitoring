import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Main from '../components/Main';

jest.mock('axios');

describe('Page', () => {
  it('render content', () => {
    render(<Main accounts={[]} />);

    const heading = screen.getByText('Content goes here');

    expect(heading).toBeInTheDocument();
  });
});
