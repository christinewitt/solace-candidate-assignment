"use client";

import { Advocates } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import { useState, ChangeEvent, useEffect } from "react";
import AdvocateCard from "./components/AdvocateCard/AdvocateCard";
import Header from "./components/Header/Header";
import Pagination from "./components/Pagination/Pagination";

export type PaginatedResponse = {
  data: Advocates[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const { data: advocates, isError, error, isLoading } = useQuery<PaginatedResponse>({
    queryKey: ["advocates", debouncedSearchTerm, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
      });

      if (debouncedSearchTerm) {
        params.append("search", debouncedSearchTerm);
      }

      const response = await fetch(`/api/advocates?${params}`);
      if (!response.ok) throw new Error("Response was not ok")
      return await response.json();
    },
  });

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const onClick = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
    setPage(1);
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <main>
      <Header onChange={onChange} onClick={onClick} searchTerm={searchTerm} />
      <section className="card-container">
        {advocates?.data.map((advocate) => (
          <AdvocateCard advocate={advocate} key={advocate.id} />
        ))}
      </section>
      <Pagination advocates={advocates} setPage={setPage} />
    </main>
  );
}
