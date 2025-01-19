import { ErrorBoundary } from '@/app/ErrorBoundary/ErrorBoundary';
import { CardsList } from '@/features/ui/CardsList';
import { Layout } from '@/app/layout/Layout';
import { EventEmitter } from '@/emitter';

function App() {
  const emitter = new EventEmitter<{ message: string }>();
  const logData = (data: { message: string }) => console.log(data.message);
  emitter.on('data', logData);
  emitter.emit('data', { message: 'Hello world' });

  // emitter.off('data', logData);

  // emitter.emit('data', { message: 'Something go wrong' });
  return (
    <Layout>
      <ErrorBoundary>
        <CardsList />
      </ErrorBoundary>
    </Layout>
  );
}

export default App;
