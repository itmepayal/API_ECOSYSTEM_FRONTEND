import api from "@/services/api";

export const getAllRequestLogs = (url?: string) => {
  return api.get(url || "/api/v1/request-logs/logs/");
};

export const getRequestLogById = (id: string) => {
  return api.get(`/api/v1/request-logs/logs/${id}/`);
};
