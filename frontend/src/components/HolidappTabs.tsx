import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import HolidappTable from "../components/HolidappTable";
import React, { useState } from "react";

interface HolidappTabsProps {}

export default function HolidappTabs(props: HolidappTabsProps) {
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

  const [years, setYears] = useState([2023, 2024].sort((a, b) => a - b));

  const addTab = () => {
    setYears([...years, years[years.length - 1] + 1]);
  };

  return (
    <Tabs>
      <TabList aria-label="List of tabs">
        {years.map((year) => (
          <Tab>{year}</Tab>
        ))}
        <Tab onClick={addTab}>+</Tab>
      </TabList>
      <TabPanels>
        <HolidappTable headers={headers} />
      </TabPanels>
    </Tabs>
  );
}
