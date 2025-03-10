"use client";
import {  useSearchParams } from "next/navigation";
import React from "react";

function Page() {
    const searchedParams = useSearchParams();
    const passedValue = searchedParams.get("passedValue")?.toString()

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-5">
      <h1>This is the creating account page</h1>
      {passedValue}
    </div>
  );
}

export default Page;
