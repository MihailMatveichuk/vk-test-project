import css from './Header.module.css';

export function Header() {
  return (
    <header className={css.wrapper}>
      <p>The Cats service.</p>
    </header>
  );
}
