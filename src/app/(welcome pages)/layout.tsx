import WelcomePagesNavbar from "@/components/WelcomePagesNavbar";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <WelcomePagesNavbar />
      {children}
    </>
  );
}

export default layout;
