"use client";
import { trpc } from "@/app/_trpc/client";
import Heading from "@/components/Heading";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import Image from "next/image";
import React from "react";
import EmptyStateContent from "../../EmptyStateContent";

enum PROPERTY_STATUS {
  EMPTY = "EMPTY",
  RENTED = "RENTED",
}

function ActiveTenantPageContent() {
  const { data, isLoading } = trpc.getActiveTenants.useQuery();
 

  return (
    <div className="w-full flex flex-col gap-3">
      {isLoading ? (
        <>
          {" "}
          <div className="flex w-full  pt-10 flex-1 items-center justify-center px-4">
            <BackgroundPattern className="absolute inset-0 left-1/2 z-0 -translate-x-1/2 opacity-75" />
            <div className="relative z-10 flex -transalte-y-1/2 flex-col items-center gap-6 text-center">
              <LoadingSpinner size={"md"} />
              <div className="size-48 ">
                <Image
                  src={"/loading.png"}
                  alt="Loading Image"
                  width={923}
                  height={890}
                  className="object-contain object-center"
                />
              </div>
              <Heading>Getting active tenants...</Heading>
              <p className="text-base/7 text-gray-600 max-w-prose">
                Please hold on for a moment.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {data?.sanitizedProperties?.length ? (
            <>
              {data?.sanitizedProperties.map((items, index) => (
                <Card
                  key={index}
                  className="w-full hover:shadow-md hover:-translate-y-0.5 transition-all "
                >
                  <CardHeader className=" flex flex-row w-full  items-center justify-start sm:justify-normal gap-3 ">
                    <h3 className="text-2xl text-deepBlue-500  font-semibold capitalize">
                      {items.name}
                    </h3>
                    <p
                      className={`py-0.5 px-2 rounded-full  text-xs ${
                        items.propertyStatus === PROPERTY_STATUS.EMPTY
                          ? "bg-green-200 text-green-500"
                          : "bg-deepBlue-200 text-deepBlue-500"
                      }`}
                    >
                      {items.propertyStatus}
                    </p>
                  </CardHeader>
                  <CardContent className="-mt-5 flex flex-col items-start gap-2">
                    {/* PROPERTY ADDRESS  */}
                    <p className="text-xs sm:text-sm opacity-70">
                      {items.address}
                    </p>
                    {/* PROPERTY RENT AMOUNT AND PERSON LIMIT  */}
                    <div className="w-full flex items-center gap-5 sm:gap-10">
                      <h2 className="text-xs sm:text-sm font-semibold ">
                        Rent amount :{" "}
                        <span className="capitalize font-medium text-black">
                          {items.rentAmount}
                        </span>
                      </h2>
                      <h2 className="text-xs sm:text-sm font-semibold ">
                        Person Limit :{" "}
                        <span className="capitalize font-medium text-black">
                          {items.personLimit}
                        </span>
                      </h2>
                    </div>
                    {/* TENANT DETAILS  */}
                    <div className="w-full flex items-center gap-5 sm:gap-10">
                      <h2 className="text-sm sm:text-md font-black text-deepBlue-600">
                        Rented to :{" "}
                        <span className="capitalize font-medium text-black">
                          {items.Tenant?.name}
                        </span>
                      </h2>
                    </div>
                    <div className="w-full flex items-center gap-5 sm:gap-10">
                      <h2 className="text-xs sm:text-sm font-semibold ">
                        Email :{" "}
                        <span className="lowercase font-medium text-black">
                          {items.Tenant?.email}
                        </span>
                      </h2>
                      <h2 className="text-xs sm:text-sm font-semibold ">
                        Contact Number :{" "}
                        <span className="capitalize font-medium text-black">
                          {items.Tenant?.contactNumber}
                        </span>
                      </h2>
                    </div>
                    <div className="w-full flex items-center gap-5 sm:gap-10">
                      <h2 className="text-xs sm:text-sm font-semibold ">
                        Working area :{" "}
                        <span className="capitalize font-medium text-black">
                          {items.Tenant?.workingArea}
                        </span>
                      </h2>
                      <h2 className="text-xs sm:text-sm font-semibold ">
                        Tenant status:{" "}
                        <span className="capitalize font-medium text-black">
                          {items.Tenant?.tenantStatus}
                        </span>
                      </h2>
                    </div>
                    {/* MAINTAINENCE REQUESTS  */}
                    <div className="w-full flex items-center gap-5 sm:gap-10">
                      <h2 className="text-sm sm:text-md font-black text-deepBlue-600">
                        No. of maintainence requests :{" "}
                        <span className="capitalize font-medium text-black">
                          0
                        </span>
                      </h2>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : (
            <>
              <EmptyStateContent />
            </>
          )}
        </>
      )}
    </div>
  );
}
const BackgroundPattern = (props: LucideProps) => {
  return (
    <svg
      width="768"
      height="736"
      viewBox="0 0 768 736"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={props.className}
    >
      <mask
        id="mask0_5036_374506"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="-32"
        width="768"
        height="768"
      >
        <rect
          width="768"
          height="768"
          transform="translate(0 -32)"
          fill="url(#paint0_radial_5036_374506)"
        />
      </mask>
      <g mask="url(#mask0_5036_374506)">
        <g clipPath="url(#clip0_5036_374506)">
          <g clipPath="url(#clip1_5036_374506)">
            <line x1="0.5" y1="-32" x2="0.5" y2="736" stroke="#E4E7EC" />
            <line x1="48.5" y1="-32" x2="48.5" y2="736" stroke="#E4E7EC" />
            <line x1="96.5" y1="-32" x2="96.5" y2="736" stroke="#E4E7EC" />
            <line x1="144.5" y1="-32" x2="144.5" y2="736" stroke="#E4E7EC" />
            <line x1="192.5" y1="-32" x2="192.5" y2="736" stroke="#E4E7EC" />
            <line x1="240.5" y1="-32" x2="240.5" y2="736" stroke="#E4E7EC" />
            <line x1="288.5" y1="-32" x2="288.5" y2="736" stroke="#E4E7EC" />
            <line x1="336.5" y1="-32" x2="336.5" y2="736" stroke="#E4E7EC" />
            <line x1="384.5" y1="-32" x2="384.5" y2="736" stroke="#E4E7EC" />
            <line x1="432.5" y1="-32" x2="432.5" y2="736" stroke="#E4E7EC" />
            <line x1="480.5" y1="-32" x2="480.5" y2="736" stroke="#E4E7EC" />
            <line x1="528.5" y1="-32" x2="528.5" y2="736" stroke="#E4E7EC" />
            <line x1="576.5" y1="-32" x2="576.5" y2="736" stroke="#E4E7EC" />
            <line x1="624.5" y1="-32" x2="624.5" y2="736" stroke="#E4E7EC" />
            <line x1="672.5" y1="-32" x2="672.5" y2="736" stroke="#E4E7EC" />
            <line x1="720.5" y1="-32" x2="720.5" y2="736" stroke="#E4E7EC" />
          </g>
          <rect x="0.5" y="-31.5" width="767" height="767" stroke="#E4E7EC" />
          <g clipPath="url(#clip2_5036_374506)">
            <line y1="15.5" x2="768" y2="15.5" stroke="#E4E7EC" />
            <line y1="63.5" x2="768" y2="63.5" stroke="#E4E7EC" />
            <line y1="111.5" x2="768" y2="111.5" stroke="#E4E7EC" />
            <line y1="159.5" x2="768" y2="159.5" stroke="#E4E7EC" />
            <line y1="207.5" x2="768" y2="207.5" stroke="#E4E7EC" />
            <line y1="255.5" x2="768" y2="255.5" stroke="#E4E7EC" />
            <line y1="303.5" x2="768" y2="303.5" stroke="#E4E7EC" />
            <line y1="351.5" x2="768" y2="351.5" stroke="#E4E7EC" />
            <line y1="399.5" x2="768" y2="399.5" stroke="#E4E7EC" />
            <line y1="447.5" x2="768" y2="447.5" stroke="#E4E7EC" />
            <line y1="495.5" x2="768" y2="495.5" stroke="#E4E7EC" />
            <line y1="543.5" x2="768" y2="543.5" stroke="#E4E7EC" />
            <line y1="591.5" x2="768" y2="591.5" stroke="#E4E7EC" />
            <line y1="639.5" x2="768" y2="639.5" stroke="#E4E7EC" />
            <line y1="687.5" x2="768" y2="687.5" stroke="#E4E7EC" />
            <line y1="735.5" x2="768" y2="735.5" stroke="#E4E7EC" />
          </g>
          <rect x="0.5" y="-31.5" width="767" height="767" stroke="#E4E7EC" />
        </g>
      </g>
      <defs>
        <radialGradient
          id="paint0_radial_5036_374506"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(384 384) rotate(90) scale(384 384)"
        >
          <stop />
          <stop offset="1" stopOpacity="0" />
        </radialGradient>
        <clipPath id="clip0_5036_374506">
          <rect
            width="768"
            height="768"
            fill="white"
            transform="translate(0 -32)"
          />
        </clipPath>
        <clipPath id="clip1_5036_374506">
          <rect y="-32" width="768" height="768" fill="white" />
        </clipPath>
        <clipPath id="clip2_5036_374506">
          <rect y="-32" width="768" height="768" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default ActiveTenantPageContent;
