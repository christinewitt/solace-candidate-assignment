import { ChangeEvent } from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  searchTerm: string;
}

export default function Header({ onChange, onClick, searchTerm }: HeaderProps) {
  return (
    <header className={styles.headerWrapper}>
      <h1 className={styles.header}>Solace Advocates</h1>
      <section className={styles.searchWrapper}>
        <div className={styles.search}>
          <label htmlFor="advocate-search">Search</label>
          <input className={styles.searchInput} id="advocate-search" onChange={onChange} placeholder="Search by name, specialty, location" value={searchTerm} />
        </div>
        <button className={styles.searchButton} onClick={onClick}>Reset Search</button>
      </section>
    </header>
  );
}
