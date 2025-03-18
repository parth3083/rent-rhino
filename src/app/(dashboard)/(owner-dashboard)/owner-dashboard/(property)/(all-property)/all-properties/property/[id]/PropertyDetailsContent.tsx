"use client";
import { trpc } from "@/app/_trpc/client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";

function PropertyDetailsContent({ id }: { id: string }) {
  console.log(id);
  const { data, isLoading } = trpc.showPropertyDetails.useQuery({ id });

  return (
    <div className="w-full flex flex-col gap-5 lg:gap-2  ">
      {isLoading ? (
        <>Loading</>
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

export default PropertyDetailsContent;
