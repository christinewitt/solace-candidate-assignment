"use client";

import { Advocates } from "@/db/schema";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: advocates, isError, error } = useQuery<Advocates[]>({
    queryKey: ["advocates", searchTerm],
    queryFn: async () => {
      const url = searchTerm
        ? `/api/advocates?search=${encodeURIComponent(searchTerm)}`
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
  };

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <main style={{ margin: "24px" }}>
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
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates?.map((advocate: Advocates) => {
            return (
              <tr key={advocate.id}>
                <td>{advocate.firstName}</td>
                <td>{advocate.lastName}</td>
                <td>{advocate.city}</td>
                <td>{advocate.degree}</td>
                <td>
                  {advocate.specialties.map((specialty) => (
                    <div key={specialty}>{specialty}</div>
                  ))}
                </td>
                <td>{advocate.yearsOfExperience}</td>
                <td>{advocate.phoneNumber}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
