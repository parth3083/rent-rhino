"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

enum PROPERTY_STATUS {
  EMPTY = "EMPTY",
  RENTED = "RENTED",
}

interface PropertyCardProps {
  id: string;
  name: string;
  address: string;
  image: string;
  area: string;
  city: string;
  state: string;
  pinCode: number;
  propertyStatus: PROPERTY_STATUS;
}

function PropertyCard({
  address,
  area,
  city,
  state,
  pinCode,
  propertyStatus,
  name,
  image,
  id,
}: PropertyCardProps) {
  return (
    <Link
      href={`/owner-dashboard/all-properties/property/${id}`}
      className="w-full"
    >
      <Card className="w-full ">
        <CardContent className="flex flex-col sm:flex-row items-center   gap-3 w-full">
          <div className="left size-24  rounded-md overflow-hidden">
            <Image
              src={image}
              alt="Property Image"
              width={500}
              height={500}
              className="object-fill w-full h-full object-center"
            />
          </div>
          <div className="right flex-1  flex flex-col">
            <CardHeader className="px-0 flex flex-row w-full  items-center justify-center sm:justify-normal gap-3">
              <h3 className="text-xl  font-semibold capitalize">{name}</h3>
              <p
                className={`py-0.5 px-2 rounded-full  text-xs ${
                  propertyStatus === PROPERTY_STATUS.EMPTY
                    ? "bg-green-200 text-green-500"
                    : "bg-deepBlue-200 text-deepBlue-500"
                }`}
              >
                {propertyStatus}
              </p>
            </CardHeader>
            <CardDescription className="flex  flex-col">
              <p className="py-3 lg:py-2 text-center sm:text-left text-sm text-gray-900/80">
                {address}
              </p>
              <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 w-full items-center  space-x-3">
                <div className="flex items-center space-x-3 w-fit">
                  <p className="text-sm text-gray-900 font-medium">
                    State :{" "}
                    <span className="capitalize font-normal">{state}</span>
                  </p>
                  <p className="text-sm text-gray-900 font-medium">
                    City :{" "}
                    <span className="capitalize font-normal">{city}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-3 w-fit">
                  <p className="text-sm text-gray-900 font-medium">
                    Area :{" "}
                    <span className="capitalize font-normal">{area}</span>
                  </p>
                  <p className="text-sm text-gray-900 font-medium">
                    Pin Code : <span className=" font-normal">{pinCode}</span>
                  </p>
                </div>
              </div>
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default PropertyCard;
