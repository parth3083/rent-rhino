import React from "react";
import EmptyStateContent from "../../EmptyStateContent";

function Lease_Rent_DetailsPageContent() {
  const bool: boolean = true;
  if (bool) {
    return <EmptyStateContent />;
  }
  return (
    <div className="w-full flex-col flex">Lease_Rent_DetailsPageContent</div>
  );
}

export default Lease_Rent_DetailsPageContent;
