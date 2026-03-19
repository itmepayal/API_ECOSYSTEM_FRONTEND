import api from "@/services/api";
import type { CategoryForm } from "@/types/category";

export const getAllCategories = (url?: string) => {
  return api.get(url || "/api/v1/api-catalog/categories/");
};

export const getCategoryById = (id: string) =>
  api.get(`/api/v1/api-catalog/categories/${id}/`);

export const createCategory = (data: CategoryForm) =>
  api.post("/api/v1/api-catalog/categories/", data);

export const updateCategory = (id: string, data: CategoryForm) =>
  api.put(`/api/v1/api-catalog/categories/${id}/`, data);

export const patchCategory = (id: string, data: Partial<CategoryForm>) =>
  api.patch(`/api/v1/api-catalog/categories/${id}/`, data);

export const deleteCategory = (id: string) =>
  api.delete(`/api/v1/api-catalog/categories/${id}/`);
