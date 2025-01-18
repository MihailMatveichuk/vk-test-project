import { act, render } from '@testing-library/react';
import { CardsList } from '../features/ui/CardsList';
import { Layout } from '../layout/Layout';

describe('Layout', () => {
  it('Should render layout and ClassList components', async () => {
    await act(async () => {
      const { container } = render(
        <Layout>
          <CardsList />
        </Layout>
      );

      expect(container).toBeInTheDocument();
    });
  });
});
