import { render } from '@testing-library/react';
import App from './app/App';

describe('App', () => {
  it('Renders the main page', () => {
    render(<App />);
  });
});
