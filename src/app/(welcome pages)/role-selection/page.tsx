"use client";
import Heading from "@/components/Heading";
import MaxWidth from "@/components/MaxWidth";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

enum BUTTON_VALUE {
  OWNER = "OWNER",
  TENANT = "TENANT",
}

function Page() {
  const router = useRouter();
  const handleClick = (value: BUTTON_VALUE) => {
    router.push(`/creating-account?passedValue=${value}`);
  };

  return (
    <div className="w-full h-screen  flex items-center justify-center">
      <MaxWidth className="w-full flex flex-col py-16 items-center justify-center">
        <Heading className="lg:text-5xl text-center">Please select your role</Heading>
        <p className="mt-2 text-md max-w-prose font-medium text-center text-pretty ">
          Before you begin, let{"'"}s get to know you better! Pick a role that
          best represents you and enjoy a customized experience.
        </p>
        <div className="w-full h-full flex flex-col flex-1 gap-5 md:gap-10 items-center justify-center">
          <div className="size-64  lg:size-64 md:size-80 ">
            <Image
              src={"/role-selection-image.png"}
              alt="Role Selection Image"
              className="w-full h-full object-contain "
              width={1120}
              height={1120}
            />
          </div>
          <div className="flex items-center w-full  justify-evenly md:px-5 lg:px-32">
            <Button
              onClick={() => handleClick(BUTTON_VALUE.OWNER)}
              className="text-sm md:text-xl bg-deepBlue-500 py-6 md:py-7 px-8 md:px-10 rounded-sm hover:bg-white hover:text-deepBlue-500 hover:ring-deepBlue-500 transition-colors cursor-pointer font-medium hover:ring-1  hover:-translate-y-0.5 hover:shadow-md"
            >
              {" "}
              I{"'"}am an Owner
            </Button>
            <Button
              onClick={() => handleClick(BUTTON_VALUE.TENANT)}
              className="text-sm md:text-xl bg-deepBlue-500 py-6 md:py-7 px-8 md:px-10 rounded-sm hover:bg-white hover:text-deepBlue-500 hover:ring-deepBlue-500 transition-colors cursor-pointer font-medium hover:ring-1  hover:-translate-y-0.5 hover:shadow-md"
            >
              {" "}
              I{"'"}am a Tenant
            </Button>
          </div>
        </div>
      </MaxWidth>
    </div>
  );
}

export default Page;
