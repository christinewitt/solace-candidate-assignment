import { PaginatedResponse } from "@/app/page";
import styles from "./SearchDetails.module.css";

type SearchDetailProps = {
  advocates: PaginatedResponse | undefined;
  searchTerm: string;
}

export default function SearchDetails({ advocates, searchTerm }: SearchDetailProps) {

  return (
    <section className={styles.searchDetailsWrapper}>
      <p>
        Searching for: <span id="search-term">{searchTerm}</span>
      </p>
      {advocates?.pagination && (
        <p>
          Displaying {((advocates.pagination.page - 1) * advocates.pagination.limit) + 1}-
          {Math.min(advocates.pagination.page * advocates.pagination.limit, advocates.pagination.total)} of{" "}
          {advocates.pagination.total} total results
        </p>
      )}
    </section >
  )
}
