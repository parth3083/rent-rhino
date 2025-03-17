"use client";
import Heading from "@/components/Heading";
import { Card, CardContent } from "@/components/ui/card";
import { LucideProps } from "lucide-react";
import Image from "next/image";
import React from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import PropertyCard from "./explore-rentals/PropertyCard";
import { trpc } from "@/app/_trpc/client";

enum PROPERTY_STATUS {
  EMPTY = "EMPTY",
  RENTED = "RENTED",
}

function AllPropertiesPageContent() {
  const { data, isLoading } = trpc.getAllProperties.useQuery(undefined, {
    refetchInterval: (query) => {
      return query.state.data?.success ? false : 1000;
    },
  });

  return (
    <div className="w-full flex flex-col gap-8">
      {isLoading ? (
        <>
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
              <Heading>Fetching properties for you</Heading>
              <p className="text-base/7 text-gray-600 max-w-prose">
                Please hold on for a moment...almost done.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {(data?.properties ?? []).length > 0 ? (
            <>
              <Card>
                <CardContent>
                  This will contain search bar and property details
                </CardContent>
              </Card>
              <div className="w-full flex flex-col gap-3">
                {data?.properties.map((items, index) => (
                  <PropertyCard
                    key={index}
                    name={items.name}
                    address={items.address}
                    image={items.images[0]}
                    area={items.area}
                    city={items.city}
                    state={items.state}
                    pinCode={items.zipCode}
                    propertyStatus={
                      PROPERTY_STATUS[
                        items.propertyStatus as keyof typeof PROPERTY_STATUS
                      ]
                    }
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex-w-full h-fit pt-12 items-center justify-center px-4">
              <BackgroundPattern className="absolute inset-0 left-1/2 z-0 -translate-x-1/2 opacity-75" />
              <div className="relative z-10 flex -transalte-y-1/2 flex-col items-center gap-6 text-center">
                <div className="size-64 ">
                  <Image
                    src={"/no-property.png"}
                    alt="Loading Image"
                    width={1120}
                    height={1120}
                    className="object-contain object-center"
                  />
                </div>
                <Heading>No Properties Listed Yet</Heading>
                <p className="text-base/7 text-gray-600 max-w-prose">
                  You haven{"'"}t added any properties. Start by listing a new
                  property to manage and track your rentals effortlessly.
                </p>
              </div>
            </div>
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
export default AllPropertiesPageContent;
