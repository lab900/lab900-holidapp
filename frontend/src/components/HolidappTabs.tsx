import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import HolidappTable from "../components/HolidappTable";
import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const startYear = 2023;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 2 },
    (_, i) => startYear + i,
  );

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [remainingVacationDays] = useState(20);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        console.log("response", response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [selectedYear]);

  const onYearClicked = (year: number) => () => {
    setSelectedYear(year);
  };

  return (
    <Tabs>
      <TabList aria-label="List of tabs">
        {years.map((year) => (
          <Tab onClick={onYearClicked(year)}>{year}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {years.map((year) => (
          <TabPanel>
            <HolidappTable headers={headers} />
          </TabPanel>
        ))}
      </TabPanels>
      <div>Remaining: {remainingVacationDays}</div>
    </Tabs>
  );
}
