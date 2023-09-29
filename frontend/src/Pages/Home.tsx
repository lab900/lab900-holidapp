import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import HolidappTabs from "../components/HolidappTabs";

export default function Home() {
  const [user] = useAuthState(auth);
  return (
    <>
      <h1>
        Welcome <strong>{user?.displayName}</strong>
      </h1>
      <HolidappTabs />
    </>
  );
}
