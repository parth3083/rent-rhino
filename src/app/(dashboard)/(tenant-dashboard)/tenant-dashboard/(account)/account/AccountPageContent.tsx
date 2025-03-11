"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { number, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {toast} from "sonner"

enum TENANT_STATUS {
  STUDENT = "STUDENT",
  WORKING_PROFESSIONAL = "WORKING_PROFESSIONAL",
  FAMILY = "FAMILY",
  SELF_EMPLOYED = "SELF_EMPLOYED",
}

const PERSONAL_DETAILS_VALIDATION = z.object({
  contactNumber: z.number().min(10).max(10),
  adharNumber: z.number().min(12).max(12),
  adharImage: z.string(),
  workingArea: z.string(),
  tenantStatus: z.nativeEnum(TENANT_STATUS),
});

type personalDetailsValidation = z.infer<typeof PERSONAL_DETAILS_VALIDATION>;

function AccountPageContent() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<personalDetailsValidation>({
    resolver: zodResolver(PERSONAL_DETAILS_VALIDATION),
  });
  const queryClient = useQueryClient();

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

  const { mutate: updateDetails, isPending } = useMutation({
    mutationFn: async (data: personalDetailsValidation) => {
      const response = await axios.post(
        "/api/tenant/account-setting/update",
        data
      );
      return await response.data;
    },
    onSuccess: () => {
      toast.success("Personal details updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["fetch-tenant-details"],
      });
    },
  });

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      "rent_rhino"
    );
    formData.append(
      "cloud_name",
      "do8etu7ml"
    );
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

  const onSubmit = (data: personalDetailsValidation) => {
    updateDetails(data);
  };

  return (
    <div className="w-full  flex flex-col">
      <h1 className="text-xl font-medium">Personal Information</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col items-start gap-5 lg:gap-8 p-2 lg:p-5 "
      >
        <div className="w-full items-center  gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input type="text" readOnly id="name" defaultValue={data?.user.name ?? ""} />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" readOnly id="email" defaultValue={data?.user.email ?? ""}  />
          </div>
        </div>
        <div className="w-full items-center gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              defaultValue={Number(data?.user.contactNumber )?? number}
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
              defaultValue={Number(data?.user.adharNumber) ?? number}
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
        <div className="w-full items-center gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="working">Working Area</Label>
            <Input
              defaultValue={data?.user.workingArea ?? ""}
              {...register("workingArea")}
              type="text"
              id="working"
              placeholder="enter state name"
            />
            {errors.workingArea ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.workingArea.message}
              </p>
            ) : null}
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="working">Tenant Status</Label>
            <Select
                onValueChange={(value: TENANT_STATUS) =>
                  setValue("tenantStatus", value)
                }
              >
                <SelectTrigger className="w-full max-w-sm">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    
                    <SelectItem value={TENANT_STATUS.STUDENT}>
                      Student
                    </SelectItem>
                    <SelectItem value={TENANT_STATUS.WORKING_PROFESSIONAL}>
                      Working Professional
                    </SelectItem>
                    <SelectItem value={TENANT_STATUS.FAMILY}>Family</SelectItem>
                  <SelectItem value={  TENANT_STATUS.SELF_EMPLOYED}>
                      Self Employeed
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            {errors.tenantStatus ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.tenantStatus.message}
              </p>
            ) : null}
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
