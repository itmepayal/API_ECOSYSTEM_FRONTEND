import { z } from "zod";

export const endpointSchema = z.object({
  name: z.string(),
  endpoint: z.string(),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  description: z.string(),
  category: z.string(),
  rate_limit: z.number(),
  is_active: z.boolean(),
  is_public: z.boolean(),

  request_schema: z.string().optional(),
  response_schema: z.string().optional(),
  example_request: z.string().optional(),
  example_response: z.string().optional(),
});

export type EndpointFormValues = z.infer<typeof endpointSchema>;
