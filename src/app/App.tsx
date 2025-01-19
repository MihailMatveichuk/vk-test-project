import { ErrorBoundary } from '@/app/ErrorBoundary/ErrorBoundary';
import { CardsList } from '@/features/ui/CardsList';
import { Layout } from '@/app/layout/Layout';

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
