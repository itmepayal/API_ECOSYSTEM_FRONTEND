import { create } from "zustand";
import {
  getAllEndpoints,
  getEndpointById,
  createEndpoint,
  updateEndpoint,
  patchEndpoint,
  deleteEndpoint,
} from "@/services/endpoints-services";
import { EndpointFormValues } from "@/schemas/endpoint";

export interface Endpoint {
  id: string;
  is_active: boolean;
  name: string;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  description: string;
  is_public: boolean;
  request_schema: string;
  response_schema: string;
  example_request: string;
  example_response: string;
  rate_limit: number;
  category: string;
  created_at?: string;
  updated_at?: string;
}

interface PaginationMeta {
  count: number;
  next: string | null;
  previous: string | null;
}

interface EndpointState {
  endpoints: Endpoint[];
  selectedEndpoint: Endpoint | null;
  meta: PaginationMeta | null;
  currentPage: number;

  loading: boolean;
  error: string | null;

  search: string;
  sorting: string;

  fetchEndpoints: (
    url?: string,
    search?: string,
    ordering?: string
  ) => Promise<void>;

  setSearch: (search: string) => void;
  setSorting: (column: string, desc: boolean) => void;

  nextPage: () => void;
  previousPage: () => void;

  addEndpoint: (data: EndpointFormValues) => Promise<boolean>;
  editEndpoint: (id: string, data: EndpointFormValues) => Promise<boolean>;
  patchEndpointById: (
    id: string,
    data: Partial<EndpointFormValues>
  ) => Promise<boolean>;
  removeEndpoint: (id: string) => Promise<boolean>;

  fetchEndpointById: (id: string) => Promise<void>;

  clearSelected: () => void;
}

export const useEndpointStore = create<EndpointState>((set, get) => ({
  endpoints: [],
  selectedEndpoint: null,
  meta: null,
  currentPage: 1,
  loading: false,
  error: null,
  search: "",
  sorting: "",

  fetchEndpoints: async (
    url = "/api/v1/api-catalog/endpoints/",
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

      const res = await getAllEndpoints(requestUrl);

      set({
        endpoints: res.data.data,
        meta: res.data.meta,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch endpoints",
        loading: false,
      });
    }
  },

  fetchEndpointById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await getEndpointById(id);
      set({
        selectedEndpoint: res.data.data,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.response?.data?.message || "Failed to fetch endpoint",
        loading: false,
      });
    }
  },

  setSearch: (search: string) => {
    set({ currentPage: 1 });
    get().fetchEndpoints(undefined, search, get().sorting);
  },

  setSorting: (column: string, desc: boolean) => {
    set({ currentPage: 1 });
    const ordering = desc ? `-${column}` : column;
    get().fetchEndpoints(undefined, get().search, ordering);
  },

  nextPage: () => {
    const { meta, fetchEndpoints, currentPage, search, sorting } = get();
    if (!meta?.next) return;
    fetchEndpoints(meta.next, search, sorting);
    set({ currentPage: currentPage + 1 });
  },

  previousPage: () => {
    const { meta, fetchEndpoints, currentPage, search, sorting } = get();
    if (!meta?.previous) return;
    fetchEndpoints(meta.previous, search, sorting);
    set({ currentPage: currentPage - 1 });
  },

  addEndpoint: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await createEndpoint(data);
      const newEndpoint = res.data.data;

      set((state) => ({
        endpoints: [newEndpoint, ...state.endpoints],
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

  editEndpoint: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await updateEndpoint(id, data);
      const updated = res.data.data;

      set((state) => ({
        endpoints: state.endpoints.map((ep) => (ep.id === id ? updated : ep)),
        selectedEndpoint: updated,
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

  patchEndpointById: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await patchEndpoint(id, data);
      const updated = res.data.data;

      set((state) => ({
        endpoints: state.endpoints.map((ep) => (ep.id === id ? updated : ep)),
        selectedEndpoint: updated,
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

  removeEndpoint: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteEndpoint(id);

      set((state) => ({
        endpoints: state.endpoints.filter((ep) => ep.id !== id),
        selectedEndpoint:
          state.selectedEndpoint?.id === id ? null : state.selectedEndpoint,
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

  clearSelected: () => set({ selectedEndpoint: null }),
}));
