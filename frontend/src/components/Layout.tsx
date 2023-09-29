import {
  Content,
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
} from "@carbon/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { Settings, Logout } from "@carbon/icons-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../firebase";

export default function Layout() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (!user) navigate("/login");
  }, [user, loading]);

  return !user ? (
    <>Loading...</>
  ) : (
    <>
      <Header aria-label="Lab900 - Holidays">
        <img style={{marginLeft: 20}} src="https://lab900.com/assets/svg/logo-mono-dark.svg" alt="Lab900" width={30} />
        <HeaderName prefix="Lab900">Holidays</HeaderName>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Logout" onClick={logout}>
            <Logout size={20} />
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      </Header>
      <Content>
        <Outlet />
      </Content>
    </>
  );
}
