"use client";

import { Advocates } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import AdvocateCard from "./components/AdvocateCard/AdvocateCard";
import Header from "./components/Header/Header";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm])

  const { data: advocates, isError, error } = useQuery<Advocates[]>({
    queryKey: ["advocates", debouncedSearchTerm],
    queryFn: async () => {
      const url = debouncedSearchTerm
        ? `/api/advocates?search=${encodeURIComponent(debouncedSearchTerm)}`
        : "/api/advocates";

      const response = await fetch(url);
      if (!response.ok) throw new Error("Response was not ok")
      return await response.json();
    }
  })

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const onClick = () => {
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <main>
      <Header onChange={onChange} onClick={onClick} searchTerm={searchTerm} />
      <section className="card-container">
        {advocates?.map((advocate) => <AdvocateCard advocate={advocate} key={advocate.id} />)}
      </section>
    </main>
  );
}
