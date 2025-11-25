import { PaginatedResponse } from "@/app/page";
import { Dispatch, SetStateAction } from "react";
import styles from "./Pagination.module.css";

type PaginationProps = {
  advocates: PaginatedResponse | undefined;
  setPage: Dispatch<SetStateAction<number>>;
}

export default function Pagination({ advocates, setPage }: PaginationProps) {
  if (!advocates?.pagination) return null;

  return (
    <section className={styles.pagination}>
      <button
        aria-label="Previous Page"
        className={styles.paginationButton}
        onClick={() => setPage((page) => Math.max(1, page - 1))}
        disabled={advocates.pagination.page === 1}
      >
        <svg width="57" height="16" viewBox="0 0 57 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.292892 7.29289C-0.0976295 7.68342 -0.0976295 8.31658 0.292892 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292892 7.29289ZM57 7L1 7V9L57 9V7Z" fill="currentColor"></path>
        </svg>
      </button>

      <span>
        Page {advocates.pagination.page} of {advocates.pagination.totalPages}
      </span>

      <button
        aria-label="Next Page"
        className={styles.paginationButton}
        onClick={() => setPage((p) => p + 1)}
        disabled={!advocates.pagination.hasMore}
      >
        <svg width="57" height="16" viewBox="0 0 57 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M56.7071 8.70711C57.0976 8.31659 57.0976 7.68342 56.7071 7.2929L50.3431 0.928937C49.9526 0.538412 49.3195 0.538412 48.9289 0.928936C48.5384 1.31946 48.5384 1.95263 48.9289 2.34315L54.5858 8L48.9289 13.6569C48.5384 14.0474 48.5384 14.6805 48.9289 15.0711C49.3195 15.4616 49.9526 15.4616 50.3431 15.0711L56.7071 8.70711ZM-8.74228e-08 9L56 9L56 7L8.74228e-08 7L-8.74228e-08 9Z" fill="currentColor"></path>
        </svg>
      </button>
    </section>
  );
}
