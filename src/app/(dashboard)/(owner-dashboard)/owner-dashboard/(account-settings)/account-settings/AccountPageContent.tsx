"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { trpc } from "@/app/_trpc/client";

const OWNER_DETAILS_VALIDATION = z.object({
  contactNumber: z
    .string()
    .min(10)
    .max(10)
    .refine(
      (val) => /^\d+$/.test(val),
      "Aadhar number must contain only digits"
    ),
  adharNumber: z
    .string()
    .min(12)
    .max(12)
    .refine(
      (val) => /^\d+$/.test(val),
      "Aadhar number must contain only digits"
    ),
  adharImage: z.string().optional(),
});

type ownerDetailsVCalidation = z.infer<typeof OWNER_DETAILS_VALIDATION>;

function AccountPageContent() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ownerDetailsVCalidation>({
    resolver: zodResolver(OWNER_DETAILS_VALIDATION),
  });

  const utils = trpc.useContext();

  const { data } = trpc.getOwner.useQuery(undefined, {
    refetchInterval: (query) => (query.state.data?.success ? false : 1000),
  });

  const { mutate: updateDetails, isPending } =
    trpc.updateOwnerDetails.useMutation({
      onSuccess: () => {
        toast("Updated successfully ✅", {
          description: "Owner details have been updated.",
        });
        utils.getOwner.invalidate();
      },
    });
  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "rent_rhino");
    formData.append("cloud_name", "do8etu7ml");
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/do8etu7ml/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image: ", error);
      return null;
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const imageUrl = await uploadImageToCloudinary(file);
    setValue("adharImage", imageUrl);
  };
  const onSubmit = (data: ownerDetailsVCalidation) => {
    updateDetails(data);
  };
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex items-center  gap-2">
        <h1 className="text-xl font-medium">Personal Information</h1>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-5 lg:gap-8 p-2 lg:p-5"
      >
        <div className="w-full items-center  gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              readOnly
              id="name"
              defaultValue={data?.owner.name ?? ""}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              readOnly
              id="email"
              defaultValue={data?.owner.email ?? ""}
            />
          </div>
        </div>
        <div className="w-full items-center gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              defaultValue={data?.owner.contactNumber ?? ""}
              {...register("contactNumber")}
              type="number"
              maxLength={10}
              id="contact"
              placeholder="contact number"
            />
            {errors.contactNumber ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.contactNumber.message}
              </p>
            ) : null}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="adharNumber">Adhar Number</Label>
            <Input
              defaultValue={data?.owner.adharNumber ?? ""}
              {...register("adharNumber")}
              type="number"
              id="adharNumber"
              maxLength={12}
              placeholder="adhar number"
            />
            {errors.adharNumber ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.adharNumber.message}
              </p>
            ) : null}
          </div>
        </div>
        {data?.owner.adharImage ? (
          <></>
        ) : (
          <div className="w-full items-center gap-8 lg:gap-36 lg:pr-36  flex ">
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="picture">Adhar Image</Label>
              <Input onChange={handleFileChange} id="picture" type="file" />
              {errors.adharImage ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.adharImage.message}
                </p>
              ) : null}
            </div>
          </div>
        )}
        <div className="w-full items-center gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="working">No. of Properties</Label>
            <Input
              type="text"
              readOnly
              id="noOfProperties"
              defaultValue={data?.owner.numberOfProperties ?? ""}
            />
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
            disabled={isPending}
            type="submit"
            className={buttonVariants({
              className:
                "px-7 hover:translate-y-0.5 transition-colors cursor-pointer hover:ring-1 hover:ring-deepBlue-600 hover:bg-white hover:text-deepBlue-600",
            })}
          >
            {isPending ? "Updating..." : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AccountPageContent;
