import {
  Content,
  Header, HeaderGlobalAction, HeaderGlobalBar,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
} from "@carbon/react";
import { Link, Outlet } from "react-router-dom";
import React from "react";
import { Settings, Logout } from '@carbon/icons-react';

export default function Layout() {
  return (
    <>
      <Header aria-label="Lab900 - Holidays">
        <HeaderName prefix="Lab900">Holidays</HeaderName>
        <HeaderNavigation aria-label="IBM [Platform]">
          <HeaderMenuItem>
            <Link to={"/"}>My request</Link>
          </HeaderMenuItem>
          <HeaderMenuItem>
            <Link to={"/auth"}>Auth</Link>
          </HeaderMenuItem>
        </HeaderNavigation>
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Admin">
            <Settings size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction aria-label="Logout">
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
