import css from './Header.module.css';

export function Header() {
  return (
    <header className={css.wrapper}>
      <img src="icon.svg" alt="icon" />
    </header>
  );
}
