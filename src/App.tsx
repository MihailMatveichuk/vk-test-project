import { CardsList } from './entities/CardsList';
import { Layout } from './layout/Layout';

import '@/styles/normalize.css';

function App() {
  return (
    <Layout>
      <CardsList />
    </Layout>
  );
}

export default App;
