import DashboardPage from "@/components/DashboardPage";
import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";
import React from "react";
import PropertyDetailsContent from "./PropertyDetailsContent";

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await currentUser();
  if (!user) {
    return notFound();
  }
  const prisma = new PrismaClient();

  const property = await prisma.property.findUnique({
    where: {
      id,
    },

    include: {
      owner: true,
    },
  });


  return (
    <DashboardPage title={property?.name ?? ""}>
      <PropertyDetailsContent id={id} />
    </DashboardPage>
  );
}

export default Page;
