"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { z } from "zod";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// enum TENANT_STATUS {
//   STUDENT = "STUDENT",
//   WORKING_PROFESSIONAL = "WORKING_PROFESSIONAL",
//   FAMILY = "FAMILY",
//   SELF_EMPLOYED = "SELF_EMPLOYED",
// }

// const PERSONAL_DETAILS_VALIDATION = z.object({
//   contactNumber: z.number().min(10).max(10),
//   adharNumber: z.number().min(12).max(12),
//   adharImage: z.string(),
//   workingArea: z.string(),
//   tenantStatus: z.nativeEnum(TENANT_STATUS),
// });

// type personalDetailsValidation = z.infer<typeof PERSONAL_DETAILS_VALIDATION>;

function AccountPageContent() {
  const { register } = useForm();

  const { data } = useQuery({
    queryKey: ["fetch-tenant-details"],
    queryFn: async () => {
      const response = await axios.get("/api/tenant/get-tenant");
      return await response.data;
    },
    refetchInterval: (query) => {
      return query.state.data?.success ? false : 1000;
    },
  });
  console.log(data);
  // const contactNumber: number = 1234567890
  // const adharNumber:number=123456789123
  return (
    <div className="w-full  flex flex-col">
      <h1 className="text-xl font-medium">Personal Information</h1>
      <form className="w-full flex flex-col items-start gap-5 lg:gap-8 p-2 lg:p-5 ">
        <div className="w-full items-center  gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input type="text" readOnly id="name" value={data?.user.name} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" readOnly id="email" value={data?.user.email} />
          </div>
        </div>
        <div className="w-full items-center gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              {...register("contactNumber")}
              type="number"
              maxLength={10}
              id="contact"
              placeholder="contact number"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="adharNumber">Adhar Number</Label>
            <Input
              {...register("adharNumber")}
              type="number"
              id="adharNumber"
              maxLength={12}
              placeholder="adhar number"
            />
          </div>
        </div>
        <div className="w-full items-center gap-8 lg:gap-36 lg:pr-36  flex ">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="picture">Adhar Image</Label>
            <Input {...register("adharImage")} id="picture" type="file" />
          </div>
        </div>
        <div className="w-full items-center gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="working">Working Area</Label>
            <Input
              {...register("workingArea")}
              type="text"
              id="working"
              placeholder="enter state name"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="working">Tenant Status</Label>
            <Select>
              <SelectTrigger className="w-full max-w-sm">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Student</SelectLabel>
                  <SelectItem value="working_professional">
                    Working Professional
                  </SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="self_employed">Self Employeed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full items-center justify-start mt-5  gap-8 lg:gap-36   flex ">
          <Button
            type="button"
            className={buttonVariants({
              variant: "outline",
              className: "px-7 ",
            })}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className={buttonVariants({
              className:
                "px-7 hover:translate-y-0.5 transition-colors cursor-pointer hover:ring-1 hover:ring-deepBlue-600 hover:bg-white hover:text-deepBlue-600",
            })}
          >
            Update
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AccountPageContent;
