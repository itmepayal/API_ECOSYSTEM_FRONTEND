"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

// ==============================
// TYPES
// ==============================
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

// ==============================
// COMPONENT
// ==============================
export function DataTable<TData, TValue>({
  columns,
  data,
  meta,
  isLoading = false,
  onNext,
  onPrevious,
  pageSize = 10,
  currentPage = 1,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
  });

  const totalPages = Math.ceil((meta?.count || 0) / pageSize);

  console.log(meta);

  return (
    <div className="space-y-4">
      {/* ================= TABLE ================= */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          {/* HEADER */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
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
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onNext}
            disabled={!meta?.next || isLoading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
