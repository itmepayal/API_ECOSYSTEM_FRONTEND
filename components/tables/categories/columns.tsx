import { CategoryDialog } from "@/components/dashboard/categories/category-dialog";
import { CategoryFormValues } from "@/components/dashboard/categories/category-form";
import { Button } from "@/components/ui/button";
import { IconPencil, IconTrash } from "@tabler/icons-react";

export const getColumns = ({
  handleDelete,
  handleEdit,
}: {
  handleDelete: (id: string) => void;
  handleEdit: (data: CategoryFormValues, id?: string) => void;
}) => [
  { id: "id", header: "ID", cell: ({ row }: any) => row.index + 1 },
  { accessorKey: "name", header: "Name", enableSorting: true },
  { accessorKey: "description", header: "Description", enableSorting: true },
  { accessorKey: "icon", header: "Icon", enableSorting: false },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }: any) => (row.original.is_active ? "Active" : "Inactive"),
    enableSorting: false,
  },
  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    cell: ({ row }: any) => (
      <div className="flex gap-2">
        <CategoryDialog
          triggerText="Edit"
          initialData={{
            name: row.original.name,
            description: row.original.description,
            icon: row.original.icon,
            is_active: row.original.is_active ? "active" : "inactive",
          }}
          categoryId={row.original.id}
          onSubmitParent={handleEdit}
        >
          <Button className="flex items-center gap-2 h-10 w-12">
            <IconPencil className="w-4 h-4" />
          </Button>
        </CategoryDialog>

        <Button
          size="sm"
          variant="destructive"
          className="flex items-center gap-2 h-10 w-12"
          onClick={() => handleDelete(row.original.id)}
        >
          <IconTrash className="w-4 h-4" />
        </Button>
      </div>
    ),
  },
];
