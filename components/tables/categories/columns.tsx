"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  is_active: boolean;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-xs text-muted-foreground">{row.original.id}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-62.5 truncate">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => <div className="text-xl">{row.original.icon}</div>,
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.is_active ? "default" : "destructive"}>
        {row.original.is_active ? "Active" : "Inactive"}
      </Badge>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm" variant="destructive">
            Delete
          </Button>
        </div>
      );
    },
  },
];
