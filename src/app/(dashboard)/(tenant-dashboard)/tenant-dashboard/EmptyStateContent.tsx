import Heading from "@/components/Heading";
import Image from "next/image";
import React from "react";

function EmptyStateContent() {
  return (
    <div className="w-full flex flex-col items-center py-10  justify-center ">
      <div className="size-60 ">
        <Image
          src={"/empty_state.png"}
          alt="Empty state content"
          width={1120}
          height={1120}
          className="object-contain object-center"
        />
      </div>
      <Heading className="md:text-3xl text-xl text-center lg:text-4xl ">
        Looks like you don{"'"}t have any rentals yet
      </Heading>
      <p className="text-xs sm:text-sm max-w-prose text-center mt-2">
        No active rentals yet—start exploring and find the ideal place for you!
      </p>
    </div>
  );
}

export default EmptyStateContent;
