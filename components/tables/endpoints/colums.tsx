import { EndpointDialog } from "@/components/dashboard/endpoints/endpoints-dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EndpointFormValues } from "@/schemas/endpoint";

import { IconPencil, IconTrash } from "@tabler/icons-react";

export const getColumns = ({
  handleDelete,
  handleEdit,
}: {
  handleDelete: (id: string) => void;
  handleEdit: (data: EndpointFormValues, id?: string) => Promise<void>;
}) => [
  {
    id: "id",
    header: "ID",
    cell: ({ row }: any) => row.index + 1,
  },

  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
  },

  {
    accessorKey: "endpoint",
    header: "Endpoint",
    enableSorting: true,
    cell: ({ row }: any) => (
      <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
        {row.original.endpoint}
      </span>
    ),
  },

  {
    accessorKey: "method",
    header: "Method",
    enableSorting: true,
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
    accessorKey: "description",
    header: "Description",
    enableSorting: false,
    cell: ({ row }: any) => (
      <span className="block max-w-60 truncate">
        {row.original.description}
      </span>
    ),
  },

  {
    accessorKey: "rate_limit",
    header: "Rate Limit",
    enableSorting: true,
  },

  {
    accessorKey: "is_public",
    header: "Public",
    enableSorting: false,
    cell: ({ row }: any) =>
      row.original.is_public ? (
        <Badge variant="default">Public</Badge>
      ) : (
        <Badge variant="secondary">Private</Badge>
      ),
  },

  {
    accessorKey: "is_active",
    header: "Status",
    enableSorting: false,
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
    enableSorting: false,
    cell: ({ row }: any) => {
      console.log(row.original);
      return (
        <div className="flex gap-2">
          <EndpointDialog
            triggerText="Edit"
            endpointId={row.original.id}
            onSubmitParent={handleEdit}
            initialData={{
              is_active: row.original.is_active,
              name: row.original.name,
              endpoint: row.original.endpoint,
              method: row.original.method,
              description: row.original.description,
              is_public: row.original.is_public,
              request_schema: row.original.request_schema,
              response_schema: row.original.response_schema,
              example_request: row.original.example_request,
              example_response: row.original.example_response,
              rate_limit: row.original.rate_limit,
              category: row.original.category,
            }}
          >
            <Button className="flex items-center gap-2 h-10 w-12">
              <IconPencil className="w-4 h-4" />
            </Button>
          </EndpointDialog>

          <Button
            size="sm"
            variant="destructive"
            className="flex items-center gap-2 h-10 w-12"
            onClick={() => handleDelete(row.original.id)}
          >
            <IconTrash className="w-4 h-4" />
          </Button>
        </div>
      );
    },
  },
];
