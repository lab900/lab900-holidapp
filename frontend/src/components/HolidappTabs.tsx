import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@carbon/react";
import HolidappTable from "../components/HolidappTable";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

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
  const [user, loading] = useAuthState(auth);

  const requestsUrl =
    "https://us-central1-lab900-holidapp.cloudfunctions.net/webApi/requests/my";

  useEffect(() => {
    setIsLoading(true);

    user?.getIdToken().then((token) => {
      console.log("token", token);
      axios
        .get(`${requestsUrl}/${selectedYear}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("response", response);
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
            {isLoading && <div>Loading...</div>}
            {!isLoading && <HolidappTable data={data} headers={headers} />}
          </TabPanel>
        ))}
      </TabPanels>
      <div>Remaining: {remainingVacationDays}</div>
    </Tabs>
  );
}
