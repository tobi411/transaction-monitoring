import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Main from '../components/Main';

jest.mock('axios');

describe('Page', () => {
  it('render content', async () => {
    await waitFor(() => {
      render(<Main accounts={[]} />);
    });

    const content = screen.getByText('Account');

    expect(content).toBeInTheDocument();
  });

  it('matches previous snapshot', async () => {
    let domTree;
    await waitFor(() => {
      domTree = renderer.create(<Main />);
    });
    expect(domTree).toMatchSnapshot();
  });
});
