"use client";

import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/tables/category/data-table";
import { getColumns } from "@/components/tables/category/columns";
import { useCategoryStore } from "@/store/category.store";
import { CategoryDialog } from "@/components/dashboard/categories/category-dialog";
import { CategoryFormValues } from "@/components/dashboard/categories/category-form";
import { toast } from "sonner";

const CategoriesPage = () => {
  const {
    categories,
    fetchCategories,
    loading,
    error,
    meta,
    nextPage,
    previousPage,
    currentPage,
    addCategory,
    editCategory,
    removeCategory,
  } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  const categoriesList = categories || [];
  const paginationMeta = meta || { count: 0, next: null, previous: null };

  // ================= ADD / EDIT =================
  const handleAddOrEdit = async (data: CategoryFormValues, id?: string) => {
    const payload = {
      ...data,
      is_active: data.is_active === "active",
    };

    if (id) {
      await editCategory(id, payload);
      toast.success("Category updated successfully!");
    } else {
      await addCategory(payload);
      toast.success("Category added successfully!");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    try {
      await removeCategory(id);
      toast.success("Category deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="px-7 py-5">
      <Card className="shadow-lg">
        <CardHeader className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-2xl font-semibold">Categories</CardTitle>
            <CardDescription className="text-gray-600">
              Manage all your categories here.
            </CardDescription>
          </div>
          <CategoryDialog onSubmitParent={handleAddOrEdit} />
        </CardHeader>

        <CardContent className="mt-4">
          {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

          <DataTable
            columns={getColumns({
              handleDelete,
              handleEdit: handleAddOrEdit,
            })}
            data={categoriesList}
            meta={paginationMeta}
            isLoading={loading}
            onNext={nextPage}
            onPrevious={previousPage}
            currentPage={currentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesPage;
