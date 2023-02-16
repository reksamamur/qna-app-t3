import type { ReactElement } from "react";

import Navbar from "./navbar";

const Layout: React.FC<{ children: ReactElement }> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
