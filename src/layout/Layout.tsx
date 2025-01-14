import { Header } from '@/entities/ui/Header';

export function Layout({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
