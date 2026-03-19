import { create } from "zustand";
import {
  getAllRequestLogs,
  getRequestLogById,
} from "@/services/request-log.service";

export interface RequestLog {
  id: string;
  api_name: string;
  api_endpoint: string;
  api_method: string;

  method: string;
  status_code: number;
  response_time: number;

  ip_address: string;
  path: string;
  user_agent: string;

  request_id: string;
  created_at: string;
}

interface PaginationMeta {
  count: number;
  next: string | null;
  previous: string | null;
}

interface RequestLogState {
  logs: RequestLog[];
  selectedLog: RequestLog | null;
  meta: PaginationMeta | null;
  currentPage: number;

  loading: boolean;
  error: string | null;

  search: string;
  sorting: string;

  fetchLogs: (
    url?: string,
    search?: string,
    ordering?: string
  ) => Promise<void>;

  getLog: (id: string) => Promise<void>;

  nextPage: () => void;
  previousPage: () => void;

  setSearch: (search: string) => void;
  setSorting: (column: string, desc: boolean) => void;

  clearSelected: () => void;
}

export const useRequestLogStore = create<RequestLogState>((set, get) => ({
  logs: [],
  selectedLog: null,
  meta: null,
  currentPage: 1,

  loading: false,
  error: null,

  search: "",
  sorting: "",

  // ================= FETCH =================
  fetchLogs: async (
    url = "/api/v1/request-logs/logs/",
    search = "",
    ordering = ""
  ) => {
    set({ loading: true, error: null, search, sorting: ordering });

    try {
      let requestUrl = url;

      // handle full URL pagination
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

      const res = await getAllRequestLogs(requestUrl);

      set({
        logs: res.data.data,
        meta: res.data.meta,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to fetch logs",
        loading: false,
      });
    }
  },

  // ================= GET SINGLE =================
  getLog: async (id) => {
    set({ loading: true, error: null });

    try {
      const res = await getRequestLogById(id);

      set({
        selectedLog: res.data.data,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "Failed to fetch log",
        loading: false,
      });
    }
  },

  // ================= SEARCH =================
  setSearch: (search: string) => {
    set({ currentPage: 1 });
    get().fetchLogs("/api/v1/request-logs/logs/", search, get().sorting);
  },

  // ================= SORT =================
  setSorting: (column: string, desc: boolean) => {
    const ordering = desc ? `-${column}` : column;

    set({ currentPage: 1 });
    get().fetchLogs("/api/v1/request-logs/logs/", get().search, ordering);
  },

  // ================= PAGINATION =================
  nextPage: () => {
    const { meta, fetchLogs, currentPage, search, sorting } = get();

    if (!meta?.next) return;

    fetchLogs(meta.next, search, sorting);
    set({ currentPage: currentPage + 1 });
  },

  previousPage: () => {
    const { meta, fetchLogs, currentPage, search, sorting } = get();

    if (!meta?.previous) return;

    fetchLogs(meta.previous, search, sorting);
    set({ currentPage: currentPage - 1 });
  },

  clearSelected: () => set({ selectedLog: null }),
}));
