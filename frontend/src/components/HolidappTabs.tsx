import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import HolidappTable from "../components/HolidappTable";
import React from "react";

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
  return (
    <Tabs>
      <TabList aria-label="List of tabs">
        <Tab>2023</Tab>
        <Tab>2024</Tab>
        <Tab>+</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <HolidappTable headers={headers} />
        </TabPanel>
        <TabPanel>Tab Panel 2</TabPanel>
        <TabPanel>Tab Panel 3</TabPanel>
      </TabPanels>
    </Tabs>
  );
}
