"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

enum PROPERTY_STATUS {
  EMPTY = "EMPTY",
  RENTED = "RENTED",
}

const PROPERTY_DETAILS_VALIDATION = z.object({
  name: z.string(),
  address: z.string(),
  area: z.string(),
  city: z.string(),
  state: z.string(),
  pinCode: z.number(),
  images: z.array(z.string()),
  personLimit: z.number(),
  propertyStatus: z.nativeEnum(PROPERTY_STATUS),
  rentAmount: z.number(),
  depositAmount: z.number(),
});

type propertyDetailsValidation = z.infer<typeof PROPERTY_DETAILS_VALIDATION>;

function AddPropertyPageContent() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));

    setImagePreviews((prev: string[]) => {
      if (prev.length) {
        prev.forEach((url) => URL.revokeObjectURL(url));
      }
      return [...prev, ...previews];
    });
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<propertyDetailsValidation>({
    resolver: zodResolver(PROPERTY_DETAILS_VALIDATION),
  });

  const onSubmit = (data: propertyDetailsValidation) => {
    console.log(data);
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  return (
    <div className="w-full flex flex-col">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-5 lg:gap-8 p-2 lg:p-5"
      >
        {/* Property Information  */}
        <div className="w-full flex items-center  gap-2">
          <h1 className="text-xl font-medium">Property Information</h1>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
        <div className="w-full items-center  gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Property Name</Label>
            <Input
              {...register("name")}
              type="text"
              id="property_name"
              placeholder="Property Name"
            />
          </div>
        </div>
        <div className="w-full items-center  gap-8 lg:gap-36   flex ">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="name">Property Address</Label>
            <Textarea
              {...register("address")}
              placeholder="Type your message here."
              id="message"
            />
          </div>
        </div>
        <div className="w-full items-center   gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="state">State</Label>
            <Input
              {...register("state")}
              type="text"
              placeholder="State name"
              id="state"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="city">City</Label>
            <Input
              {...register("city")}
              type="text"
              placeholder="City name"
              id="city"
            />
          </div>
        </div>
        <div className="w-full items-center   gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="state">Area</Label>
            <Input
              {...register("area")}
              type="text"
              placeholder="Area name"
              id="area"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="pincode">Pin Code</Label>
            <Input
              {...register("pinCode")}
              type="number"
              placeholder="Pin Code"
              id="pincode"
            />
          </div>
        </div>

        {/* Property Specifications  */}
        <div className="w-full flex items-center  gap-2">
          <h1 className="text-xl font-medium">Property Specifications</h1>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
        <div className="w-full items-center gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="max_occupancy">Maximum Occupancy</Label>
            <Input
              {...register("personLimit")}
              type="number"
              id="max_occupancy"
              placeholder="enter state name"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="property_status">Property Status</Label>
            <Select
              onValueChange={(value: PROPERTY_STATUS) =>
                setValue("propertyStatus", value)
              }
            >
              <SelectTrigger className="w-full max-w-sm">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={PROPERTY_STATUS.EMPTY}>Empty</SelectItem>
                  <SelectItem value={PROPERTY_STATUS.RENTED}>Rented</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Financial Details  */}
        <div className="w-full flex items-center  gap-2">
          <h1 className="text-xl font-medium">Financial Details</h1>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
        <div className="w-full items-center   gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="rent">Rent amount (₹)</Label>
            <Input
              {...register("rentAmount")}
              type="number"
              placeholder="Enter rent amount "
              id="rent"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="deposit">Deposit Amount (₹)</Label>
            <Input
              {...register("depositAmount")}
              type="number"
              placeholder="Enter deposit amount"
              id="deposit"
            />
          </div>
        </div>

        {/* Media Uploads  */}
        <div className="w-full flex items-center  gap-2">
          <h1 className="text-xl font-medium">Media Uploads</h1>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
        <div className="w-full items-center gap-8 lg:gap-36 lg:pr-36  flex ">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="picture">Property Images</Label>
            <Input
              {...register("images")}
              multiple onChange={handleChange} id="picture" type="file" />
          </div>
        </div>
        {imagePreviews.length > 0 && (
          <Card className="w-full mx-auto pointer-events-none">
            <CardContent className="w-full mx-auto flex flex-col sm:flex-row justify-center sm:justify-normal flex-wrap items-center gap-5">
              {imagePreviews.map((src, index) => (
                <div
                  key={index}
                  className="relative  rounded-md overflow-hidden flex items-center  justify-center flex-shrink-0 size-44 md:size-24 lg:size-44"
                >
                  <Image
                    src={src}
                    alt={`Preview ${index + 1}`}
                    fill
                    className=" w-full h-full  object-fill"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Final Buttons  */}
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
            type="submit"
            className={buttonVariants({
              className:
                "px-7 hover:translate-y-0.5 transition-colors cursor-pointer hover:ring-1 hover:ring-deepBlue-600 hover:bg-white hover:text-deepBlue-600",
            })}
          >
            Add Property
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddPropertyPageContent;
