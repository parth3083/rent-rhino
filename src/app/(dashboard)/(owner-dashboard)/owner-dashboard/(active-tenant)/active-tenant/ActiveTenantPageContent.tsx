import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";

enum PROPERTY_STATUS {
  EMPTY = "EMPTY",
  RENTED = "RENTED",
}

function ActiveTenantPageContent() {
  const loading: boolean = false;
  const propertyStatus: string = "RENTED";

  return (
    <div className="w-full flex flex-col gap-3">
      {loading ? (
        <>Loading</>
      ) : (
        <>
          <Card className="w-full hover:shadow-md hover:-translate-y-0.5 transition-all ">
            <CardHeader className=" flex flex-row w-full  items-center justify-start sm:justify-normal gap-3 ">
              <h3 className="text-2xl text-deepBlue-500  font-semibold capitalize">
                Luxury Villa
              </h3>
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
            <CardContent className="-mt-5 flex flex-col items-start gap-2">
              {/* PROPERTY ADDRESS  */}
              <p className="text-xs sm:text-sm opacity-70">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur ipsum dolore sunt doloremque sed voluptas.
              </p>
              {/* PROPERTY RENT AMOUNT AND PERSON LIMIT  */}
              <div className="w-full flex items-center gap-5 sm:gap-10">
                <h2 className="text-xs sm:text-sm font-semibold ">
                  Rent amount :{" "}
                  <span className="capitalize font-medium text-black">
                    5000
                  </span>
                </h2>
                <h2 className="text-xs sm:text-sm font-semibold ">
                  Person Limit :{" "}
                  <span className="capitalize font-medium text-black">5</span>
                </h2>
              </div>
              {/* TENANT DETAILS  */}
              <div className="w-full flex items-center gap-5 sm:gap-10">
                <h2 className="text-sm sm:text-md font-black text-deepBlue-600">
                  Rented to :{" "}
                  <span className="capitalize font-medium text-black">
                    Pranshu Patel
                  </span>
                </h2>
              </div>
              <div className="w-full flex items-center gap-5 sm:gap-10">
                <h2 className="text-xs sm:text-sm font-semibold ">
                  Email :{" "}
                  <span className="lowercase font-medium text-black">
                    pranshu@gmail.com
                  </span>
                </h2>
                <h2 className="text-xs sm:text-sm font-semibold ">
                  Contact Number :{" "}
                  <span className="capitalize font-medium text-black">
                    1234567890
                  </span>
                </h2>
              </div>
              <div className="w-full flex items-center gap-5 sm:gap-10">
                <h2 className="text-xs sm:text-sm font-semibold ">
                  Working area :{" "}
                  <span className="capitalize font-medium text-black">
                    Gujarat
                  </span>
                </h2>
                <h2 className="text-xs sm:text-sm font-semibold ">
                  Tenant status:{" "}
                  <span className="capitalize font-medium text-black">
                    Student
                  </span>
                </h2>
              </div>
              {/* MAINTAINENCE REQUESTS  */}
              <div className="w-full flex items-center gap-5 sm:gap-10">
                <h2 className="text-sm sm:text-md font-black text-deepBlue-600">
                  No. of maintainence requests :{" "}
                  <span className="capitalize font-medium text-black">0</span>
                </h2>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

export default ActiveTenantPageContent;
