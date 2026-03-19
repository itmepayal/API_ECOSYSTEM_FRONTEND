import { create } from "zustand";
import {
  getAllPlaygrounds,
  getPlaygroundById,
  createPlayground,
  deletePlayground,
  rerunPlayground,
} from "@/services/playground-service";

import type { PlaygroundFormValues } from "@/schemas/playground";

export interface Playground {
  id: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  endpoint_url: string;

  request_body?: string;
  query_params?: string;
  request_headers?: string;

  response_body?: string;
  status_code?: number;

  is_active: boolean;
  api: string;

  created_at?: string;
  updated_at?: string;
}

interface PaginationMeta {
  count: number;
  next: string | null;
  previous: string | null;
}

interface PlaygroundState {
  playgrounds: Playground[];
  selectedPlayground: Playground | null;
  meta: PaginationMeta | null;
  currentPage: number;

  loading: boolean;
  error: string | null;

  search: string;
  sorting: string;

  fetchPlaygrounds: (
    url?: string,
    search?: string,
    ordering?: string
  ) => Promise<void>;

  getPlayground: (id: string) => Promise<void>;

  addPlayground: (data: PlaygroundFormValues) => Promise<boolean>;
  removePlayground: (id: string) => Promise<boolean>;
  rerunPlaygroundById: (id: string) => Promise<boolean>;

  nextPage: () => void;
  previousPage: () => void;

  setSearch: (search: string) => void;
  setSorting: (column: string, desc: boolean) => void;

  clearSelected: () => void;
}

export const usePlaygroundStore = create<PlaygroundState>((set, get) => ({
  playgrounds: [],
  selectedPlayground: null,
  meta: null,
  currentPage: 1,

  loading: false,
  error: null,

  search: "",
  sorting: "",

  fetchPlaygrounds: async (
    url = "/api/v1/playground/",
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

      const query = new URLSearchParams(params).toString();

      if (query) {
        requestUrl += (requestUrl.includes("?") ? "&" : "?") + query;
      }

      const res = await getAllPlaygrounds(requestUrl);

      set({
        playgrounds: res.data.data,
        meta: res.data.meta,
        loading: false,
      });
    } catch (err: unknown) {
      const message =
        (err as any)?.response?.data?.message || "Failed to fetch playgrounds";

      set({
        error: message,
        loading: false,
      });
    }
  },

  setSearch: (search: string) => {
    set({ currentPage: 1 });

    get().fetchPlaygrounds("/api/v1/playground/", search, get().sorting);
  },

  setSorting: (column: string, desc: boolean) => {
    const ordering = desc ? `-${column}` : column;

    set({ currentPage: 1 });

    get().fetchPlaygrounds("/api/v1/playground/", get().search, ordering);
  },

  getPlayground: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await getPlaygroundById(id);

      set({
        selectedPlayground: res.data.data,
        loading: false,
      });
    } catch (err: unknown) {
      const message =
        (err as any)?.response?.data?.message || "Failed to fetch playground";

      set({
        error: message,
        loading: false,
      });
    }
  },

  addPlayground: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await createPlayground(data);
      const newItem = res.data.data;

      set((state) => ({
        playgrounds: [
          newItem,
          ...state.playgrounds.filter((p) => p.id !== newItem.id),
        ],
        loading: false,
      }));

      return true;
    } catch (err: unknown) {
      const message = (err as any)?.response?.data?.message || "Create failed";

      set({
        error: message,
        loading: false,
      });

      return false;
    }
  },

  removePlayground: async (id) => {
    set({ loading: true, error: null });

    try {
      await deletePlayground(id);

      set((state) => ({
        playgrounds: state.playgrounds.filter((p) => p.id !== id),
        loading: false,
      }));

      return true;
    } catch (err: unknown) {
      const message = (err as any)?.response?.data?.message || "Delete failed";

      set({
        error: message,
        loading: false,
      });

      return false;
    }
  },

  rerunPlaygroundById: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await rerunPlayground(id);
      const updated = res.data.data;

      set((state) => ({
        playgrounds: state.playgrounds.map((p) => (p.id === id ? updated : p)),
        loading: false,
      }));

      return true;
    } catch (err: unknown) {
      const message = (err as any)?.response?.data?.message || "Rerun failed";

      set({
        error: message,
        loading: false,
      });

      return false;
    }
  },

  nextPage: () => {
    const { meta, fetchPlaygrounds, currentPage, search, sorting } = get();

    if (!meta?.next) return;

    set({ error: null });

    fetchPlaygrounds(meta.next, search, sorting);
    set({ currentPage: currentPage + 1 });
  },

  previousPage: () => {
    const { meta, fetchPlaygrounds, currentPage, search, sorting } = get();

    if (!meta?.previous) return;

    set({ error: null });

    fetchPlaygrounds(meta.previous, search, sorting);
    set({ currentPage: currentPage - 1 });
  },

  clearSelected: () => set({ selectedPlayground: null }),
}));
