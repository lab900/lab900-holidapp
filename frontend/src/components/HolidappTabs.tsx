import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import HolidappTable from "../components/HolidappTable";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import AddHolidayRequest from "./AddHolidayRequest";

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
  const [remainingVacationDays, setRemainingVacationDays] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [user] = useAuthState(auth);

  const requestsUrl =
    "https://us-central1-lab900-holidapp.cloudfunctions.net/webApi/requests/my";

  useEffect(() => {
    setIsLoading(true);

    user?.getIdToken().then((token) => {
      axios
        .get(`${requestsUrl}/${selectedYear}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setRemainingVacationDays(18);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    });
  }, [selectedYear, user]);

  const onYearClicked = (year: number) => () => {
    setSelectedYear(year);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <AddHolidayRequest />
      </div>
      <Tabs>
        <TabList aria-label="List of tabs">
          {years.map((year) => (
            <Tab onClick={onYearClicked(year)}>{year}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {years.map((year) => (
            <TabPanel>
              {isLoading && <div>Loading...</div>}
              {!isLoading && <HolidappTable data={data} headers={headers} />}
            </TabPanel>
          ))}
        </TabPanels>
        <div>Remaining: {remainingVacationDays}</div>
      </Tabs>
    </>
  );
}
