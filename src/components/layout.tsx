import { useSession } from "next-auth/react";
import type { ReactElement } from "react";

import Navbar from "./navbar";
import UnauthorizedPage from "./unauthorized-page";

const Layout = ({
  children,
  route,
}: {
  children: ReactElement;
  route?: Parameters<typeof Navbar>["0"]["route"];
}) => {
  const { status } = useSession();

  if (status === "authenticated") {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar route={route} />
        <main className="flex w-full flex-grow bg-gray-100">{children}</main>
      </div>
    );
  }

  return <UnauthorizedPage />;
};

export default Layout;
