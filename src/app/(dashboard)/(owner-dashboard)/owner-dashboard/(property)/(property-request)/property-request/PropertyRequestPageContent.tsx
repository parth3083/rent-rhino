import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

enum PROPERTY_STATUS {
  EMPTY = "EMPTY",
  RENTED = "RENTED",
}

function PropertyRequestPageContent() {
  const name = "Property Name";
  const propertyStatus = PROPERTY_STATUS.EMPTY;
  const nameOfTenant = "Tenat";
  return (
    <div className="w-full flex flex-col">
      <Tabs defaultValue="today" className="w-full ">
        <TabsList className="gap-10">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="month"> This Month</TabsTrigger>
        </TabsList>
        <TabsContent  value="today" className="flex flex-col items-center gap-3">
          <Link
            href={"/"}
            className="w-full rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Card className="w-full ">
              <CardHeader className=" flex flex-row w-full  items-center justify-start sm:justify-normal gap-3 ">
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
              <CardContent className="-mt-5 flex items-center gap-2">
                <span className="text-gray-600 text-sm"> Requested by : </span>
                <span className="text-md font-medium ">{nameOfTenant}</span>
              </CardContent>
            </Card>
          </Link>
        </TabsContent>
        <TabsContent value="week" className="flex flex-col items-center gap-3">
          {" "}
          <Link
            href={"/"}
            className="w-full rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Card className="w-full ">
              <CardHeader className=" flex flex-row w-full  items-center justify-start sm:justify-normal gap-3 ">
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
              <CardContent className="-mt-5 flex items-center gap-2">
                <span className="text-gray-600 text-sm"> Requested by : </span>
                <span className="text-md font-medium ">{nameOfTenant}</span>
              </CardContent>
            </Card>
          </Link>
        </TabsContent>
        <TabsContent value="month" className="flex flex-col items-center gap-3">
          {" "}
          <Link
            href={"/"}
            className="w-full rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Card className="w-full ">
              <CardHeader className=" flex flex-row w-full  items-center justify-start sm:justify-normal gap-3 ">
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
              <CardContent className="-mt-5 flex items-center gap-2">
                <span className="text-gray-600 text-sm"> Requested by : </span>
                <span className="text-md font-medium ">{nameOfTenant}</span>
              </CardContent>
            </Card>
          </Link>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default PropertyRequestPageContent;
