import DashboardPage from "@/components/DashboardPage";
import React from "react";
import PropertyRequestPageContent from "./PropertyRequestPageContent";

function Page() {
  return (
    <DashboardPage title="Property Requests">
      <PropertyRequestPageContent />
    </DashboardPage>
  );
}

export default Page;
