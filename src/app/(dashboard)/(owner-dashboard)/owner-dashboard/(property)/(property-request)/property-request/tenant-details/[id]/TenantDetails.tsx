"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

enum PROPERTY_STATUS {
    EMPTY = "EMPTY",
    RENTED = "RENTED",
  }

function TenantDetails({ id }: { id: string }) {
  const { data, isLoading } = trpc.getTenantDetailsForOwner.useQuery({ id });

  return (
    <div className="w-full flex flex-col gap-5 lg:gap-5">
      {isLoading ? (
        <>Loading state</>
      ) : (
        <>
          {/* TENANT PERSONAL DETAILS  */}
          <div className="w-full flex items-center mb-3 gap-2">
            <h1 className="text-xl font-medium">Tenant Personal Information</h1>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div className="flex items-center -mt-3 gap-10">
            <h2 className="text-md font-black text-deepBlue-600">
              Tenant Name :{" "}
              <span className="capitalize font-medium text-black">
                {data?.tenant.name}
              </span>
            </h2>
            <h2 className="text-md font-black text-deepBlue-600">
              Tenant Email:{" "}
              <span className="lowercase font-medium text-black">
                {data?.tenant.email}
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-10">
            <h2 className="text-md font-black text-deepBlue-600">
              Contact Number :{" "}
              <span className="capitalize font-medium text-black">
                {data?.tenant.contactNumber}
              </span>
            </h2>
            <h2 className="text-md font-black text-deepBlue-600">
              Adhar Number:{" "}
              <span className="lowercase font-medium text-black">
                {data?.tenant.adharNumber}
              </span>
            </h2>
          </div>
          {/* TENANT WORKING DETAILS  */}
          <div className="w-full flex items-center mb-3 gap-2">
            <h1 className="text-xl font-medium">
              Tenant Perfessional Information
            </h1>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div className="flex items-center -mt-3 gap-10">
            <h2 className="text-md font-black text-deepBlue-600">
              Working State :{" "}
              <span className="capitalize font-medium text-black">
                {data?.tenant.workingArea}
              </span>
            </h2>
            <h2 className="text-md font-black text-deepBlue-600">
              Tenant Status:{" "}
              <span className="capitalize font-medium text-black">
                {data?.tenant.tenantStatus}
              </span>
            </h2>
          </div>

          {/* PROPERTY REQUEST  */}
          <div className="w-full flex items-center mb-3 gap-2">
            <h1 className="text-xl font-medium">Property Request</h1>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div className="flex items-center -mt-3 gap-10">
            <h2 className="text-md font-black text-deepBlue-600">
              Property Name:{" "}
              <span className="capitalize font-medium text-black">
                {data?.property?.name}
              </span>
            </h2>
            <h2 className="text-md font-black text-deepBlue-600">
              Property Status:{" "}
              <span className="capitalize font-medium text-black">
                {data?.property?.propertyStatus}
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-10">
            <Link
              href={`/owner-dashboard/all-properties/property/${data?.propertyId}`}
              className="text-md font-medium text-gray-700 transition-colors hover:underline cursor-pointer hover:text-deepBlue-600"
            >
              property details...
            </Link>
          </div>
          {/* RESPOND TO REQUEST  */}
          <div className="w-full flex items-center mb-3 gap-2">
            <h1 className="text-xl font-medium">Respond to Request</h1>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <div className="flex items-center gap-10">
            <Button className="hover:bg-white hover:-translate-y-0.5 cursor-pointer hover:text-deepBlue-500 hover:shadow hover:border-deepBlue-500 hover:border transition-colors">
              Chat
            </Button>
            <Button className="hover:bg-white hover:-translate-y-0.5 cursor-pointer hover:text-deepBlue-500 hover:shadow hover:border-deepBlue-500 hover:border transition-colors">
              Accept
            </Button>
            <Button variant="outline">Reject</Button>
          </div>
        </>
      )}
    </div>
  );
}

export default TenantDetails;
