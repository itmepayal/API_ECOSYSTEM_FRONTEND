import { z } from "zod";

export const playgroundSchema = z.object({
  is_active: z.boolean(),

  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"], {
    message: "Invalid method selected",
  }),

  endpoint_url: z
    .string()
    .min(1, "Endpoint URL is required")
    .startsWith("/", "Endpoint must start with '/'"),

  request_body: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        try {
          JSON.parse(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid JSON format in request body" }
    ),

  query_params: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        try {
          JSON.parse(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid JSON format in query params" }
    ),

  request_headers: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (!val) return true;
        try {
          JSON.parse(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid JSON format in headers" }
    ),

  api: z.string().uuid("Invalid API ID"),
});

export type PlaygroundFormValues = z.infer<typeof playgroundSchema>;
