"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { trpc } from "@/app/_trpc/client";

const MAINTAINENCE_REQUEST_VALIDATION = z.object({
  title: z.string().min(3, "Title must be 1 character long"),
  description: z.string(),
  image: z.array(z.string()).optional(),
});

type maintainenceRequestValidation = z.infer<
  typeof MAINTAINENCE_REQUEST_VALIDATION
>;
function MaintainenceRequestPageContent() {
  const loading: boolean = true;
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    setImageFiles(files);

    // Preview images
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => {
      prev.forEach((url) => URL.revokeObjectURL(url));
      return previews;
    });
  };
  const uploadImagesToCloudinary = async (files: File[]) => {
    const uploads = files.map(async (file) => {
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
    });
    return Promise.all(uploads);
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<maintainenceRequestValidation>({
    resolver: zodResolver(MAINTAINENCE_REQUEST_VALIDATION),
  });
  const { mutate: registerRequest, isPending } =
    trpc.registerMaintainenceRequest.useMutation({
      onSuccess: () => {
        reset();
        setImagePreviews([]);
        toast("Request Regsitered ✅", {
          description: "Request has been registered successfully.",
        });
      },
    });
  const onSubmit = async (data: maintainenceRequestValidation) => {
    const uploadImageUrls = await uploadImagesToCloudinary(imageFiles);
    data.image = uploadImageUrls.filter(
      (url): url is string => typeof url === "string"
    );

    if (data.image.length === 0) {
      toast.error("Image upload failed. Please try again.");
      return;
    }

    registerRequest(data);
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
        {/* Request Information  */}
        <div className="w-full flex items-center  gap-2">
          <h1 className="text-xl font-medium">Request Information</h1>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
        {/* ISSUE TITLE  */}
        <div className="w-full items-center  gap-8 lg:gap-36   flex ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="issue_name">Issue title</Label>
            <Input
              {...register("title")}
              type="text"
              id="issue_name"
              placeholder="Issue title "
            />
            {errors.title ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            ) : null}
          </div>
        </div>

        {/* ISSUE DESCRIPTION  */}
        <div className="w-full items-center  gap-8 lg:gap-36   flex ">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="description">Issue description</Label>
            <Textarea
              {...register("description")}
              placeholder="Enter the issue description"
              id="message"
            />
            {errors.description ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            ) : null}
          </div>
        </div>

        {/* ISSUE IMAGES  */}
        <div className="w-full flex items-center  gap-2">
          <h1 className="text-xl font-medium">Issue Images </h1>
          <div className="h-px flex-1 bg-gray-300" />
        </div>
        <div className="w-full items-center gap-8 lg:gap-36 lg:pr-36  flex ">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="picture">Issue Images</Label>
            <Input
              multiple
              onChange={handleChange}
              id="picture"
              type="file"
              accept="image/*"
            />
            {errors.image ? (
              <p className="mt-1 text-sm text-red-500">
                {errors.image.message}
              </p>
            ) : null}
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
        <div className="w-full items-center justify-start mt-5  gap-8 lg:gap-36   flex ">
          <Button
            type="submit"
            disabled={isPending}
            className={buttonVariants({
              className:
                "px-7 hover:translate-y-0.5 transition-colors cursor-pointer hover:ring-1 hover:ring-deepBlue-600 hover:bg-white hover:text-deepBlue-600",
            })}
          >
            {isPending ? "Requesting..." : "Add Request"}
          </Button>
          <Button
            type="button"
            className={buttonVariants({
              variant: "outline",
              className: "px-7 ",
            })}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MaintainenceRequestPageContent;
