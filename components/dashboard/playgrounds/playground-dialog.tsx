"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { toast } from "sonner";

import { playgroundSchema, PlaygroundFormValues } from "@/schemas/playground";

import { PlaygroundForm } from "@/components/dashboard/playgrounds/playground-form";

interface PlaygroundDialogProps {
  onSubmitParent: (data: PlaygroundFormValues) => Promise<void>;
  triggerText?: string;
  children?: React.ReactNode;
}

export const PlaygroundDialog: FC<PlaygroundDialogProps> = ({
  onSubmitParent,
  triggerText = "Add Playground",
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PlaygroundFormValues>({
    resolver: zodResolver(playgroundSchema),
    defaultValues: {
      method: "GET",
      endpoint_url: "",
      request_body: "",
      query_params: "",
      request_headers: "",
      is_active: true,
      api: "",
    },
  });

  const onSubmit = async (data: PlaygroundFormValues) => {
    setIsLoading(true);

    try {
      const safeParse = (val?: string) => {
        if (!val) return undefined;
        try {
          return JSON.parse(val);
        } catch {
          throw new Error("Invalid JSON");
        }
      };

      const payload = {
        ...data,
        request_body: safeParse(data.request_body),
        query_params: safeParse(data.query_params),
        request_headers: safeParse(data.request_headers),
      };

      await onSubmitParent(payload);

      toast.success("Playground created successfully");

      reset();
      setOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Failed to create playground");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="flex items-center gap-2 py-2">
            <IconPlus className="w-4 h-4" />
            {triggerText}
          </Button>
        )}
      </SheetTrigger>

      <SheetContent className="w-125 sm:w-150 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create Playground</SheetTitle>
          <SheetDescription>
            Add a new API playground and test your endpoint.
          </SheetDescription>
        </SheetHeader>

        <PlaygroundForm
          onSubmit={onSubmit}
          control={control}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

        {/* Cancel */}
        <div className="mt-2 mb-5 px-4">
          <SheetClose asChild>
            <Button variant="outline" className="w-full">
              Cancel
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
