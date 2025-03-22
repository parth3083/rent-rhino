import DashboardPage from "@/components/DashboardPage";
import React from "react";
import TenantDetails from "./TenantDetails";

async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  return (
    <DashboardPage title="Tenant Details">
          <TenantDetails id={id} />
    </DashboardPage>
  );
}

export default Page;
