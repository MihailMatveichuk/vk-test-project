import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';
import { CardsList } from '../features/ui/CardsList';
import { Layout } from '../layout/Layout';

function App() {
  return (
    <Layout>
      <ErrorBoundary>
        <CardsList />
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
