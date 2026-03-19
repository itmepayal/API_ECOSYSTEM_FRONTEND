"use client";

import { FC } from "react";
import {
  Controller,
  Control,
  UseFormHandleSubmit,
  UseFormRegister,
  FieldErrors,
} from "react-hook-form";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export type CategoryFormValues = {
  name: string;
  description: string;
  icon: string;
  is_active: "active" | "inactive";
};

interface CategoryFormProps {
  onSubmit: (data: CategoryFormValues) => void;
  isLoading: boolean;
  control: Control<CategoryFormValues>;
  register: UseFormRegister<CategoryFormValues>;
  errors: FieldErrors<CategoryFormValues>;
  handleSubmit: UseFormHandleSubmit<CategoryFormValues>;
}

export const CategoryForm: FC<CategoryFormProps> = ({
  onSubmit,
  isLoading,
  control,
  register,
  errors,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="space-y-4 mt-2">
        <Field>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </Field>

        <Field>
          <Label htmlFor="icon">Icon</Label>
          <Input id="icon" {...register("icon")} />
        </Field>

        <Field>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Type category description here..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </Field>

        <Field>
          <Label>Status</Label>
          <Controller
            control={control}
            name="is_active"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </Field>
      </FieldGroup>

      <div className="mt-6 flex justify-end gap-2">
        <Button type="submit" className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
};
