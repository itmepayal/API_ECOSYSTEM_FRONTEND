import { create } from "zustand";
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  patchCategory,
  deleteCategory,
} from "@/services/category.service";
import type { CategoryForm } from "@/types/category";

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

  search: string;
  sorting: string;

  fetchCategories: (
    url?: string,
    search?: string,
    ordering?: string
  ) => Promise<void>;
  setSearch: (search: string) => void;
  setSorting: (column: string, desc: boolean) => void;

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

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  selectedCategory: null,
  meta: null,
  currentPage: 1,
  loading: false,
  error: null,
  search: "",
  sorting: "",

  fetchCategories: async (
    url = "/api/v1/api-catalog/categories/",
    search = "",
    ordering = ""
  ) => {
    set({ loading: true, error: null, search, sorting: ordering });
    try {
      let requestUrl = url;
      if (url.startsWith("http")) {
        const u = new URL(url);
        requestUrl = u.pathname + u.search;
      }

      const params: Record<string, string> = {};
      if (search) params.search = search;
      if (ordering) params.ordering = ordering;

      const queryString = new URLSearchParams(params).toString();
      if (queryString) {
        requestUrl += (requestUrl.includes("?") ? "&" : "?") + queryString;
      }

      const res = await getAllCategories(requestUrl);

      set({
        categories: res.data.data,
        meta: res.data.meta,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch categories",
        loading: false,
      });
    }
  },

  setSearch: (search: string) => {
    set({ currentPage: 1 });
    get().fetchCategories(undefined, search, get().sorting);
  },

  setSorting: (column: string, desc: boolean) => {
    set({ currentPage: 1 });
    const ordering = desc ? `-${column}` : column;
    get().fetchCategories(undefined, get().search, ordering);
  },

  nextPage: () => {
    const { meta, fetchCategories, currentPage, search, sorting } = get();
    if (!meta?.next) return;
    fetchCategories(meta.next, search, sorting);
    set({ currentPage: currentPage + 1 });
  },

  previousPage: () => {
    const { meta, fetchCategories, currentPage, search, sorting } = get();
    if (!meta?.previous) return;
    fetchCategories(meta.previous, search, sorting);
    set({ currentPage: currentPage - 1 });
  },

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
