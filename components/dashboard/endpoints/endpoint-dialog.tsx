"use client";

import { FC, useState, useEffect } from "react";
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

import { endpointSchema, EndpointFormValues } from "@/schemas/endpoint";
import { EndpointForm } from "@/components/dashboard/endpoints/endpoint-form";

interface EndpointDialogProps {
  onSubmitParent: (data: EndpointFormValues, id?: string) => Promise<void>;
  triggerText?: string;
  initialData?: EndpointFormValues;
  endpointId?: string;
  children?: React.ReactNode;
}

export const EndpointDialog: FC<EndpointDialogProps> = ({
  onSubmitParent,
  triggerText = "Add Endpoint",
  initialData,
  endpointId,
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
  } = useForm<EndpointFormValues>({
    resolver: zodResolver(endpointSchema),
    defaultValues: {
      is_active: true,
      name: "",
      endpoint: "",
      method: "GET",
      description: "",
      is_public: true,
      request_schema: "",
      response_schema: "",
      example_request: "",
      example_response: "",
      rate_limit: 1000,
      category: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({ ...initialData });
    }
  }, [initialData, reset]);

  const onSubmit = async (data: EndpointFormValues) => {
    setIsLoading(true);
    try {
      await onSubmitParent(data, endpointId);
      reset();
      setOpen(false);
    } catch (err) {
      toast.error("Failed to save endpoint.");
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
            {triggerText === "Add Endpoint" && <IconPlus className="w-4 h-4" />}
            {triggerText}
          </Button>
        )}
      </SheetTrigger>

      <SheetContent className="w-125 sm:w-150 overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {endpointId ? "Edit Endpoint" : "Create Endpoint"}
          </SheetTitle>
          <SheetDescription>
            {endpointId
              ? "Update endpoint details below."
              : "Add a new API endpoint below and click save."}
          </SheetDescription>
        </SheetHeader>

        <EndpointForm
          onSubmit={onSubmit}
          control={control}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

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
