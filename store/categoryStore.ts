import { create } from "zustand";

import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  patchCategory,
  deleteCategory,
} from "@/services/categoryService";

import type { CategoryForm } from "@/types/category";

// ==============================
// TYPES
// ==============================

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface PaginationMeta {
  count: number;
  next: string | null;
  previous: string | null;
}

interface CategoryState {
  categories: Category[];
  selectedCategory: Category | null;

  meta: PaginationMeta | null;
  currentPage: number;

  loading: boolean;
  error: string | null;

  fetchCategories: (url?: string) => Promise<void>;
  fetchCategoryById: (id: string) => Promise<void>;

  nextPage: () => void;
  previousPage: () => void;

  addCategory: (data: CategoryForm) => Promise<boolean>;
  editCategory: (id: string, data: CategoryForm) => Promise<boolean>;
  patchCategoryById: (
    id: string,
    data: Partial<CategoryForm>
  ) => Promise<boolean>;

  removeCategory: (id: string) => Promise<boolean>;

  clearSelected: () => void;
}

// ==============================
// STORE
// ==============================

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  selectedCategory: null,

  meta: null,
  currentPage: 1,

  loading: false,
  error: null,

  // ==============================
  // FETCH ALL
  // ==============================
  fetchCategories: async (url = "/api/v1/api-catalog/categories/") => {
    set({ loading: true, error: null });

    try {
      const res = await getAllCategories(url);

      console.log(res);

      set({
        categories: res.data.data,
        meta: res.data.meta,
        loading: false,
      });
    } catch (err: any) {
      console.log(err);
      set({
        error: err.response?.data?.message || "Failed to fetch categories",
        loading: false,
      });
    }
  },

  // ==============================
  // PAGINATION (FULL URL SUPPORTED)
  // ==============================
  nextPage: () => {
    const { meta, fetchCategories, currentPage } = get();

    if (!meta?.next) return;

    fetchCategories(meta.next);
    set({ currentPage: currentPage + 1 });
  },

  previousPage: () => {
    const { meta, fetchCategories, currentPage } = get();

    if (!meta?.previous) return;

    fetchCategories(meta.previous);
    set({ currentPage: currentPage - 1 });
  },

  // ==============================
  // FETCH SINGLE
  // ==============================
  fetchCategoryById: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await getCategoryById(id);

      set({
        selectedCategory: res.data.data,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch category",
        loading: false,
      });
    }
  },

  // ==============================
  // CREATE
  // ==============================
  addCategory: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await createCategory(data);
      const newCategory = res.data.data;

      set((state) => ({
        categories: [newCategory, ...state.categories],
        loading: false,
      }));

      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Create failed",
        loading: false,
      });

      return false;
    }
  },

  // ==============================
  // UPDATE
  // ==============================
  editCategory: async (id, data) => {
    set({ loading: true, error: null });

    try {
      const res = await updateCategory(id, data);
      const updated = res.data.data;

      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? updated : cat
        ),
        selectedCategory: updated,
        loading: false,
      }));

      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Update failed",
        loading: false,
      });

      return false;
    }
  },

  // ==============================
  // PATCH
  // ==============================
  patchCategoryById: async (id, data) => {
    set({ loading: true, error: null });

    try {
      const res = await patchCategory(id, data);
      const updated = res.data.data;

      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? updated : cat
        ),
        selectedCategory: updated,
        loading: false,
      }));

      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Patch failed",
        loading: false,
      });

      return false;
    }
  },

  // ==============================
  // DELETE
  // ==============================
  removeCategory: async (id) => {
    set({ loading: true, error: null });

    try {
      await deleteCategory(id);

      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
        selectedCategory:
          state.selectedCategory?.id === id ? null : state.selectedCategory,
        loading: false,
      }));

      return true;
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Delete failed",
        loading: false,
      });

      return false;
    }
  },

  clearSelected: () => set({ selectedCategory: null }),
}));
