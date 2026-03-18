"use client";

import { FC, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import {
  CategoryForm,
  CategoryFormValues,
} from "@/components/dashboard/categories/category-form";
import { toast } from "sonner";

interface CategoryDialogProps {
  onSubmitParent: (data: CategoryFormValues, id?: string) => void;
  triggerText?: string;
  initialData?: CategoryFormValues;
  categoryId?: string;
  children?: React.ReactNode;
}

export const CategoryDialog: FC<CategoryDialogProps> = ({
  onSubmitParent,
  triggerText = "Add Category",
  initialData,
  categoryId,
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
  } = useForm<CategoryFormValues>({
    defaultValues: initialData || {
      name: "",
      description: "",
      icon: "",
      is_active: "active",
    },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = async (data: CategoryFormValues) => {
    setIsLoading(true);
    try {
      await onSubmitParent(data, categoryId);
      reset();
      setOpen(false);
    } catch (err) {
      toast.error("Failed to save category.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="flex items-center gap-2 py-2">
            {triggerText === "Add Category" && <IconPlus className="w-4 h-4" />}
            {triggerText}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>
            {categoryId ? "Edit Category" : "Create Category"}
          </DialogTitle>
          <DialogDescription>
            {categoryId
              ? "Update category details below."
              : "Add a new category below and click save."}
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          onSubmit={onSubmit}
          control={control}
          register={register}
          errors={errors}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />

        <DialogClose asChild>
          <Button variant="outline" className="mt-2 w-full">
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
