"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
  SortingState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IconLoader2 } from "@tabler/icons-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { useCategoryStore } from "@/store/categories-store";

interface PaginationMeta {
  count: number;
  next: string | null;
  previous: string | null;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  meta: PaginationMeta;
  isLoading?: boolean;

  onNext?: () => void;
  onPrevious?: () => void;

  pageSize?: number;
  currentPage?: number;
}

export function DataTable<TData extends { [key: string]: any }, TValue>({
  columns,
  data,
  meta,
  isLoading = false,
  onNext,
  onPrevious,
  pageSize = 10,
  currentPage = 1,
}: DataTableProps<TData, TValue>) {
  // -------------------
  // STATE
  // -------------------
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  const { setSearch, setSorting: storeSetSorting } = useCategoryStore();

  // -------------------
  // TABLE INSTANCE
  // -------------------
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: meta ? Math.ceil(meta.count / pageSize) : 0,
    state: { columnVisibility, sorting },
    onColumnVisibilityChange: setColumnVisibility,
  });

  const totalPages = Math.ceil((meta?.count || 0) / pageSize);

  return (
    <div className="space-y-4">
      {/* ================= SEARCH + COLUMN VISIBILITY DROPDOWN ================= */}

      <div className="flex items-center justify-between pb-2">
        <input
          type="text"
          placeholder="Search categories..."
          className="border px-2 py-2.5 rounded w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setSearch(e.target.value);
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Columns</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  className="capitalize"
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-hidden rounded-md border">
        <Table className="table-fixed border-collapse w-full">
          {/* HEADER */}
          <TableHeader className="border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border-r last:border-r-0 cursor-pointer"
                    onClick={
                      header.column.getCanSort()
                        ? () => header.column.toggleSorting()
                        : undefined
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : null}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  <div className="flex items-center justify-center">
                    <IconLoader2 className="animate-spin" />
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b last:border-b-0">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="border-r last:border-r-0"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevious}
            disabled={!meta?.previous || isLoading}
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={!meta?.next || isLoading}
          >
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
