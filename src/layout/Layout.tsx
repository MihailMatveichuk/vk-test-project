import { Header } from '@/entities/Header';

export function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
