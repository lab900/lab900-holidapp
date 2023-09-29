import React from "react";
import HolidappTable from "../components/holidapp.table";

export default function Home() {
  const headers = [
    {
      key: "requester",
      header: "Requester",
    },
    {
      key: "from",
      header: "From",
    },
    {
      key: "to",
      header: "To",
    },
    {
      key: "status",
      header: "Status",
    },
    {
      key: "amountOfDaysTaken",
      header: "Amount of days taken",
    },
  ];
  return (
    <>
      <h1>Home</h1>
      <HolidappTable headers={headers} />
    </>
  );
}
