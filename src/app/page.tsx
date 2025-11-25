"use client";

import { Advocates } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useEffect, useState } from "react";
import AdvocateCard from "./components/AdvocateCard/AdvocateCard";

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
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} value={searchTerm} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <section className="card-container">
        {advocates?.map((advocate) => <AdvocateCard advocate={advocate} key={advocate.id} />)}
      </section>
    </main>
  );
}
