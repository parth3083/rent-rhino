import React from "react";
import MaxWidth from "./MaxWidth";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { SignOutButton } from "@clerk/nextjs";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

async function WelcomePagesNavbar() {
  const user = await currentUser();
  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg tranisiton-all">
      <MaxWidth className="flex h-16 items-center justify-between">
        <Link href={"/"} className="flex z-40 font-semibold">
          Rent
          <span className="text-deepBlue-600"> Rhino</span>
        </Link>
        <div className="h-full flex items-center space-x-4">
          {user ? (
            <>
              <SignOutButton>
                <Button size={"sm"} variant={"ghost"}>
                  Sign Out
                </Button>
              </SignOutButton>
              <div className="px-4 flex items-center gap-2">
                <div className="size-7 rounded-full overflow-hidden">
                  <Image
                    src={user.imageUrl}
                    alt="User profile"
                    className="object-cover rounded-full"
                    width={100}
                    height={100}
                  />
                </div>
                <p className="text-base/7 font-medium capitalize">
                  {user.fullName}
                </p>
              </div>
            </>
          ) : (
            <>
              <Link
                href={"/sign-in"}
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                Sign in
              </Link>
              <div className="h-8 w-px bg-gray-200" />
              <Link
                href={"/sign-up"}
                className={buttonVariants({
                  size: "sm",
                  className: "flex items-center gap-1",
                })}
              >
                Sign Up <ArrowRight className="ml-1.5 size-4" />
              </Link>
            </>
          )}
        </div>
      </MaxWidth>
    </nav>
  );
}

export default WelcomePagesNavbar;
