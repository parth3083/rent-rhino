import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

function MaintainenceRequestPageContent() {
  return (
    <div className="w-full flex flex-col gap-3">
      <Link
        href={"/"}
        className="rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all ease-linear"
      >
        <Card className="w-full">
          <CardHeader className="w-full flex flex-col gap-2">
            <section className="upper text-xs sm:text-sm section w-full flex items-center gap-10">
              <h4 className=" text-gray-600">
                <span className="font-medium text-gray-700">
                  Request No. :{" "}
                </span>
                1
              </h4>
              <h4 className=" text-gray-600">
                <span className="font-medium text-gray-700">Request id : </span>
                Lorem, ipsum dolor.
              </h4>
            </section>
            <section className="lower w-full">
              <h3 className="text-xl  sm:text-3xl text-deepBlue-500   font-semibold capitalize">
                Blockage of water
              </h3>
            </section>
          </CardHeader>
          <CardContent className="w-full -mt-3">
            <p className="text-xs sm:text-sm opacity-70">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit
              iure, rerum dicta aut cum, non quis repudiandae aspernatur
              pariatur natus quos unde. Nihil nobis, sequi nostrum suscipit
              illum natus qui, obcaecati, hic amet harum dolore nemo in placeat
              modi reprehenderit fugiat vero debitis explicabo odio provident
              temporibus sit dicta! Nesciunt.
            </p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export default MaintainenceRequestPageContent;
