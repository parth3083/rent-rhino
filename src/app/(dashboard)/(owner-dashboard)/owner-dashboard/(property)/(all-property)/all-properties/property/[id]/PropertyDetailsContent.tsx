"use client";
import { trpc } from "@/app/_trpc/client";
import Heading from "@/components/Heading";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { LucideProps } from "lucide-react";
import Image from "next/image";
import React from "react";

function PropertyDetailsContent({ id }: { id: string }) {
  console.log(id);
  const { data, isLoading } = trpc.showPropertyDetails.useQuery({ id });

  return (
    <div className="w-full flex flex-col gap-5 lg:gap-2  ">
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
              <Heading>Getting property info...</Heading>
              <p className="text-base/7 text-gray-600 max-w-prose">
                Please hold on for a moment.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Property Location  */}
          <div className="w-full flex items-center mb-3 gap-2">
            <h1 className="text-xl font-medium">Property Location</h1>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-md font-black text-deepBlue-600">
              Property Name :{" "}
              <span className="capitalize font-medium text-black">
                {data?.name}
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <h2 className="text-md font-black text-deepBlue-600">
              Property Address :{" "}
              <span className="capitalize font-medium text-black">
                {data?.address}
              </span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-10">
            <div className="flex items-start  gap-10">
              <h2 className="text-md font-black text-deepBlue-600">
                State :{" "}
                <span className="capitalize font-medium text-black">
                  {data?.state}
                </span>
              </h2>
              <h2 className="text-md font-black text-deepBlue-600">
                City :{" "}
                <span className="capitalize font-medium text-black">
                  {data?.city}
                </span>
              </h2>
            </div>
            <div className="flex items-start  gap-10">
              <h2 className="text-md font-black text-deepBlue-600">
                Area :{" "}
                <span className="capitalize font-medium text-black">
                  {data?.area}
                </span>
              </h2>
              <h2 className="text-md font-black text-deepBlue-600">
                Pin code :{" "}
                <span className="capitalize font-medium text-black">
                  {data?.zipCode}
                </span>
              </h2>
            </div>
          </div>

          {/* Property Images  */}
          <div className="w-full flex items-center mb-3 mt-3 gap-2">
            <h1 className="text-xl font-medium">Property Images</h1>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div className="w-full px-5">
            <Carousel className="w-full ">
              <CarouselContent className="-ml-1">
                {data?.images.map((items, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-1 md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <Image
                            src={items}
                            alt="Property Image"
                            width={500}
                            height={500}
                            className="object-fill w-full h-full object-center"
                            quality={100}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Rental Details  */}
          <div className="w-full flex items-center mb-3 mt-3 gap-2">
            <h1 className="text-xl font-medium">Rental Details</h1>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div className="flex items-start gap-10">
            <h2 className="text-md font-black text-deepBlue-600">
              Person Limit :{" "}
              <span className="capitalize font-medium text-black">
                {data?.personLimit}
              </span>
            </h2>
            <h2 className="text-md font-black text-deepBlue-600">
              Property Status :{" "}
              <span className="capitalize font-medium text-black">
                {data?.propertyStatus}
              </span>
            </h2>
          </div>
          <div className="flex items-start mt-2 gap-10">
            <h2 className="text-md font-black text-deepBlue-600">
              Rent Amount (per month) :{" "}
              <span className="capitalize font-medium text-black">
                {data?.rentAmount}
              </span>
            </h2>
            <h2 className="text-md font-black text-deepBlue-600">
              Deposit Amount :{" "}
              <span className="capitalize font-medium text-black">
                {data?.depositAmount}
              </span>
            </h2>
          </div>

          {/* Owner Details  */}
          <div className="w-full flex items-center mb-3 mt-3 gap-2">
            <h1 className="text-xl font-medium">Owner Details</h1>
            <div className="h-px flex-1 bg-gray-300" />
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-10">
            <div className="flex items-start  gap-10">
              <h2 className="text-md font-black text-deepBlue-600">
                Name :{" "}
                <span className="capitalize font-medium text-black">
                  {data?.owner?.name}
                </span>
              </h2>
              <h2 className="text-md font-black text-deepBlue-600">
                Email :{" "}
                <span className="lowercase font-medium text-black">
                  {data?.owner?.email}
                </span>
              </h2>
            </div>
            <h2 className="text-md font-black text-deepBlue-600">
              Contact Number :{" "}
              <span className="capitalize font-medium text-black">
                {data?.owner?.contactNumber}
              </span>
            </h2>
          </div>
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
export default PropertyDetailsContent;
