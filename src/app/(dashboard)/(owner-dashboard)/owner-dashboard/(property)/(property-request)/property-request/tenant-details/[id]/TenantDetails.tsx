"use client";
import { trpc } from "@/app/_trpc/client";
import Heading from "@/components/Heading";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { LucideProps } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

enum PROPERTY_STATUS {
  EMPTY = "EMPTY",
  RENTED = "RENTED",
}

function TenantDetails({ id }: { id: string }) {
  const router = useRouter();
  const { data, isLoading } = trpc.getTenantDetailsForOwner.useQuery({ id });

  const { mutate: rejectPropertyRequest, isPending } =
    trpc.rejectPropertyRequest.useMutation({
      onSuccess: () => {
        toast.success("Property Request Rejected successfully");
        router.back();
      },
    });

  const { mutate: updateThePropertyRequestStatus, isPending: isPendingStatus } =
    trpc.updateThePropertyRequestStatus.useMutation({
      onSuccess: () => {
        toast.success("Property Request Status Updated successfully");
        router.back();
      },
    });

  return (
    <div className="w-full flex flex-col gap-5 lg:gap-5">
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
              <Heading>Getting tenant info...</Heading>
              <p className="text-base/7 text-gray-600 max-w-prose">
                Please hold on for a moment.
              </p>
            </div>
          </div>
        </>
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
            <Button
              onClick={() => updateThePropertyRequestStatus({ id })}
              disabled={isPendingStatus}
              className="hover:bg-white hover:-translate-y-0.5 cursor-pointer hover:text-deepBlue-500 hover:shadow hover:border-deepBlue-500 hover:border transition-colors"
            >
              {isPendingStatus ? "Accepting..." : "Accept"}
            </Button>
            <Button
              onClick={() => rejectPropertyRequest({ id })}
              disabled={isPending}
              variant="outline"
            >
              {isPending ? "Rejecting..." : "Reject"}
            </Button>
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
export default TenantDetails;
