"use client";

import { FC } from "react";
import { useEffect } from "react";
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
import { PlaygroundFormValues } from "@/schemas/playground";
import { useEndpointStore } from "@/store/endpoint.store";

interface PlaygroundFormProps {
  onSubmit: (data: PlaygroundFormValues) => void;
  isLoading: boolean;
  control: Control<PlaygroundFormValues>;
  register: UseFormRegister<PlaygroundFormValues>;
  errors: FieldErrors<PlaygroundFormValues>;
  handleSubmit: UseFormHandleSubmit<PlaygroundFormValues>;
}

export const PlaygroundForm: FC<PlaygroundFormProps> = ({
  onSubmit,
  isLoading,
  control,
  register,
  errors,
  handleSubmit,
}) => {
  const {
    endpoints,
    fetchEndpoints,
    loading: endpointsLoading,
  } = useEndpointStore();

  useEffect(() => {
    fetchEndpoints();
  }, [fetchEndpoints]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup className="space-y-4 mt-2 px-4">
        {/* API ID */}
        <Field>
          <Label>API</Label>

          <Controller
            control={control}
            name="api"
            rules={{ required: "API is required" }}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select API" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Available APIs</SelectLabel>

                    {endpointsLoading ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : endpoints.length === 0 ? (
                      <SelectItem value="empty" disabled>
                        No APIs found
                      </SelectItem>
                    ) : (
                      endpoints.map((ep) => (
                        <SelectItem key={ep.id} value={ep.id}>
                          {ep.name} ({ep.method})
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />

          {errors.api && (
            <p className="text-red-500 text-sm">{errors.api.message}</p>
          )}
        </Field>

        {/* Endpoint URL */}
        <Field>
          <Label>Endpoint URL</Label>
          <Input
            placeholder="/api/v1/example"
            {...register("endpoint_url", {
              required: "Endpoint URL is required",
            })}
          />
          {errors.endpoint_url && (
            <p className="text-red-500 text-sm">
              {errors.endpoint_url.message}
            </p>
          )}
        </Field>

        {/* Method */}
        <Field>
          <Label>Method</Label>
          <Controller
            control={control}
            name="method"
            rules={{ required: "Method is required" }}
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
          {errors.method && (
            <p className="text-red-500 text-sm">{errors.method.message}</p>
          )}
        </Field>

        {/* Query Params */}
        <Field>
          <Label>Query Params (JSON)</Label>
          <Controller
            control={control}
            name="query_params"
            render={({ field }) => (
              <MonacoEditor
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
        </Field>

        {/* Request Headers */}
        <Field>
          <Label>Request Headers (JSON)</Label>
          <Controller
            control={control}
            name="request_headers"
            render={({ field }) => (
              <MonacoEditor
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
        </Field>

        {/* Request Body */}
        <Field>
          <Label>Request Body (JSON)</Label>
          <Controller
            control={control}
            name="request_body"
            render={({ field }) => (
              <MonacoEditor
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
        </Field>

        {/* Status */}
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
      </FieldGroup>

      {/* Submit */}
      <div className="mt-6 px-4">
        <Button type="submit" className="w-full">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Create Playground"
          )}
        </Button>
      </div>
    </form>
  );
};
