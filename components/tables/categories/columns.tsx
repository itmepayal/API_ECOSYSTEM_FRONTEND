import { CategoryDialog } from "@/components/dashboard/categories/category-dialog";
import { CategoryFormValues } from "@/components/dashboard/categories/category-form";
import { Button } from "@/components/ui/button";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import * as LucideIcons from "lucide-react";

export const getColumns = ({
  handleDelete,
  handleEdit,
}: {
  handleDelete: (id: string) => void;
  handleEdit: (data: CategoryFormValues, id?: string) => void;
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
    accessorKey: "description",
    header: "Description",
    enableSorting: true,
    cell: ({ row }: any) => (
      <span className="block max-w-50 truncate">
        {row.original.description}
      </span>
    ),
  },

  {
    accessorKey: "icon",
    header: "Icon",
    enableSorting: false,
    cell: ({ row }: any) => {
      const iconName = row.original.icon;

      // Get icon dynamically from lucide-react
      const IconComponent = (LucideIcons as any)[iconName];

      return IconComponent ? (
        <IconComponent className="w-5 h-5" />
      ) : (
        <span className="text-sm text-gray-500">{iconName}</span>
      );
    },
  },

  {
    accessorKey: "is_active",
    header: "Status",
    enableSorting: false,
    cell: ({ row }: any) =>
      row.original.is_active ? (
        <span className="text-green-600 font-medium">Active</span>
      ) : (
        <span className="text-red-500 font-medium">Inactive</span>
      ),
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
