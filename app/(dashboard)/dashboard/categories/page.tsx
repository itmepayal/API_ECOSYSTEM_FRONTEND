"use client";

import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/tables/categories/columns";

import { useCategoryStore } from "@/store/categoryStore";

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
  } = useCategoryStore();

  const categoriesList = (categories as any) || [];
  const paginationMeta = meta || {
    count: 0,
    next: null,
    previous: null,
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <div className="px-7 py-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Categories</CardTitle>
          <CardDescription>Manage all your categories here.</CardDescription>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
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
