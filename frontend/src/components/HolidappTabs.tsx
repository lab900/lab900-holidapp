import { Tabs, TabList, Tab, TabPanels } from "@carbon/react";
import HolidappTable from "../components/HolidappTable";
import React, { useState } from "react";

interface HolidappTabsProps {}

export default function HolidappTabs(props: HolidappTabsProps) {
  const headers = [
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

  const [remainingVacationDays] = useState(20);

  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 2 },
    (_, i) => startYear + i,
  );
  return (
    <Tabs>
      <TabList aria-label="List of tabs">
        {years.map((year) => (
          <Tab>{year}</Tab>
        ))}
      </TabList>
      <TabPanels>
        <HolidappTable headers={headers} />
      </TabPanels>
      <div>Remaining: {remainingVacationDays}</div>
    </Tabs>
  );
}
