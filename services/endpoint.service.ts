import { EndpointFormValues } from "@/schemas/endpoint";
import api from "@/services/api";

export const getAllEndpoints = (url?: string) => {
  return api.get(url || "/api/v1/api-catalog/endpoints/");
};

export const getEndpointById = (id: string) => {
  return api.get(`/api/v1/api-catalog/endpoints/${id}/`);
};

export const createEndpoint = (data: EndpointFormValues) => {
  return api.post("/api/v1/api-catalog/endpoints/", data);
};

export const updateEndpoint = (id: string, data: EndpointFormValues) => {
  return api.put(`/api/v1/api-catalog/endpoints/${id}/`, data);
};

export const patchEndpoint = (
  id: string,
  data: Partial<EndpointFormValues>
) => {
  return api.patch(`/api/v1/api-catalog/endpoints/${id}/`, data);
};

export const deleteEndpoint = (id: string) => {
  return api.delete(`/api/v1/api-catalog/endpoints/${id}/`);
};
