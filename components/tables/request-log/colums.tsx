import { Badge } from "@/components/ui/badge";

export const getColumns = () => [
  {
    id: "id",
    header: "ID",
    cell: ({ row }: any) => row.index + 1,
  },

  {
    accessorKey: "api_name",
    header: "API Name",
  },

  {
    accessorKey: "api_endpoint",
    header: "Endpoint",
    cell: ({ row }: any) => (
      <span className="font-mono text-xs truncate max-w-60 block">
        {row.original.api_endpoint}
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
    accessorKey: "status_code",
    header: "Status Code",
    cell: ({ row }: any) => {
      const code = row.original.status_code;

      return (
        <Badge variant={code >= 200 && code < 300 ? "default" : "destructive"}>
          {code}
        </Badge>
      );
    },
  },

  {
    accessorKey: "response_time",
    header: "Response Time (ms)",
  },

  {
    accessorKey: "ip_address",
    header: "IP",
  },

  {
    accessorKey: "path",
    header: "Path",
    cell: ({ row }: any) => (
      <span className="text-xs truncate max-w-60 block">
        {row.original.path}
      </span>
    ),
  },

  {
    accessorKey: "user_agent",
    header: "User Agent",
    cell: ({ row }: any) => (
      <span className="text-xs truncate max-w-60 block">
        {row.original.user_agent}
      </span>
    ),
  },
];
