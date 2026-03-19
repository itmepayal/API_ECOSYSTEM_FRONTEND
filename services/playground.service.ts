import api from "@/services/api";
import type { PlaygroundFormValues } from "@/schemas/playground";

export const getAllPlaygrounds = (url?: string) => {
  return api.get(url || "/api/v1/playground/");
};

export const getPlaygroundById = (id: string) => {
  return api.get(`/api/v1/playground/${id}/`);
};

export const createPlayground = (data: PlaygroundFormValues) => {
  return api.post("/api/v1/playground/", data);
};

export const deletePlayground = (id: string) => {
  return api.delete(`/api/v1/playground/${id}/`);
};

export const rerunPlayground = (id: string) => {
  return api.post(`/api/v1/playground/${id}/rerun/`);
};
