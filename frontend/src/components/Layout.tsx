import {
  Content,
  Header,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
} from "@carbon/react";
import { Link, Outlet } from "react-router-dom";

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
      </Header>
      <Content>
        <Outlet />
      </Content>
    </>
  );
}
