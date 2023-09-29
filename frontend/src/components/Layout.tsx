import {Header, HeaderMenuItem, HeaderName, HeaderNavigation} from "@carbon/react";

export default function Layout() {
    return (
        <div className="Layout">
            <Header aria-label="Lab900 - Holidays">
                <HeaderName href="#" prefix="Lab900">Holidays</HeaderName>
                <HeaderNavigation aria-label="IBM [Platform]">
                    <HeaderMenuItem href="#">My request</HeaderMenuItem>
                    <HeaderMenuItem href="#">Link 2</HeaderMenuItem>
                    <HeaderMenuItem href="#">Link 3</HeaderMenuItem>
                </HeaderNavigation>
            </Header>
        </div>
    );
}