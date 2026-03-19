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

import { MonacoEditor } from "@/components/editor/monaco-editor";
import { EndpointFormValues } from "@/schemas/endpoint";

import { useCategoryStore } from "@/store/category.store";
import { useEffect } from "react";

interface EndpointFormProps {
  onSubmit: (data: EndpointFormValues) => void;
  isLoading: boolean;
  control: Control<EndpointFormValues>;
  register: UseFormRegister<EndpointFormValues>;
  errors: FieldErrors<EndpointFormValues>;
  handleSubmit: UseFormHandleSubmit<EndpointFormValues>;
}

export const EndpointForm: FC<EndpointFormProps> = ({
  onSubmit,
  isLoading,
  control,
  register,
  errors,
  handleSubmit,
}) => {
  const { categories, fetchCategories, loading } = useCategoryStore();
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="space-y-4 mt-2 px-4">
        {/* Name */}
        <Field>
          <Label>Name</Label>
          <Input
            placeholder="Enter API name (e.g. Get Users)"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </Field>

        {/* Endpoint */}
        <Field>
          <Label>Endpoint</Label>
          <Input
            placeholder="/api/v1/example"
            {...register("endpoint", { required: "Endpoint is required" })}
          />
          {errors.endpoint && (
            <p className="text-red-500 text-sm">{errors.endpoint.message}</p>
          )}
        </Field>

        {/* Method */}
        <Field>
          <Label>Method</Label>
          <Controller
            control={control}
            name="method"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>HTTP Methods</SelectLabel>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="PATCH">PATCH</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        {/* Description */}
        <Field>
          <Label>Description</Label>
          <Input {...register("description")} />
        </Field>

        {/* Category */}
        <Field>
          <Label>Category</Label>

          <Controller
            control={control}
            name="category"
            rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>

                    {loading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : categories.length === 0 ? (
                      <SelectItem value="empty" disabled>
                        No categories found
                      </SelectItem>
                    ) : (
                      categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </Field>

        {/* Rate Limit */}
        <Field>
          <Label>Rate Limit</Label>
          <Input
            type="number"
            {...register("rate_limit", { valueAsNumber: true })}
          />
        </Field>

        {/* 🔥 Monaco Fields */}

        {/* Request Schema */}
        <Field>
          <Label>Request Schema</Label>
          <Controller
            control={control}
            name="request_schema"
            render={({ field }) => (
              <MonacoEditor
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
        </Field>

        {/* Response Schema */}
        <Field>
          <Label>Response Schema</Label>
          <Controller
            control={control}
            name="response_schema"
            render={({ field }) => (
              <MonacoEditor
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
        </Field>

        {/* Example Request */}
        <Field>
          <Label>Example Request</Label>
          <Controller
            control={control}
            name="example_request"
            render={({ field }) => (
              <MonacoEditor
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
        </Field>

        {/* Example Response */}
        <Field>
          <Label>Example Response</Label>
          <Controller
            control={control}
            name="example_response"
            render={({ field }) => (
              <MonacoEditor
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
        </Field>

        {/* Status + Public */}
        <div className="flex gap-4">
          <Field>
            <Label>Status</Label>
            <Controller
              control={control}
              name="is_active"
              render={({ field }) => (
                <Select
                  value={field.value ? "active" : "inactive"}
                  onValueChange={(v) => field.onChange(v === "active")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>

          <Field>
            <Label>Public</Label>
            <Controller
              control={control}
              name="is_public"
              render={({ field }) => (
                <Select
                  value={field.value ? "public" : "private"}
                  onValueChange={(v) => field.onChange(v === "public")}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>
      </FieldGroup>

      {/* Submit */}
      <div className="mt-6 px-4">
        <Button type="submit" className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </form>
  );
};
