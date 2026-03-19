import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconTrash } from "@tabler/icons-react";

export const getColumns = ({
  handleDelete,
}: {
  handleDelete: (id: string) => void;
}) => [
  {
    id: "id",
    header: "ID",
    cell: ({ row }: any) => row.index + 1,
  },

  {
    accessorKey: "endpoint_url",
    header: "Endpoint",
    cell: ({ row }: any) => (
      <span className="font-mono block max-w-60 truncate text-xs px-2 py-1 rounded bg-muted">
        {row.original.endpoint_url}
      </span>
    ),
  },

  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }: any) => {
      const method = row.original.method;

      const variantMap: any = {
        GET: "default",
        POST: "secondary",
        PUT: "outline",
        PATCH: "outline",
        DELETE: "destructive",
      };

      return <Badge variant={variantMap[method]}>{method}</Badge>;
    },
  },

  {
    accessorKey: "request_body",
    header: "Body",
    cell: ({ row }: any) => (
      <span className="block max-w-60 truncate text-xs">
        {row.original.request_body || "-"}
      </span>
    ),
  },

  {
    accessorKey: "query_params",
    header: "Query",
    cell: ({ row }: any) => (
      <span className="block max-w-60 truncate text-xs">
        {row.original.query_params || "-"}
      </span>
    ),
  },

  {
    accessorKey: "request_headers",
    header: "Headers",
    cell: ({ row }: any) => (
      <span className="block max-w-60 truncate text-xs">
        {row.original.request_headers || "-"}
      </span>
    ),
  },

  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }: any) =>
      row.original.is_active ? (
        <Badge variant="default">Active</Badge>
      ) : (
        <Badge variant="destructive">Inactive</Badge>
      ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }: any) => (
      <Button
        size="sm"
        variant="destructive"
        className="flex items-center gap-2 h-10 w-12"
        onClick={() => handleDelete(row.original.id)}
      >
        <IconTrash className="w-4 h-4" />
      </Button>
    ),
  },
];
