"use client";

import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getColumns } from "@/components/tables/playground/colums";
import { DataTable } from "@/components/tables/playground/data-table";

import { usePlaygroundStore } from "@/store/playground.store";

import { PlaygroundDialog } from "@/components/dashboard/playgrounds/playground-dialog";

import { toast } from "sonner";
import { PlaygroundFormValues } from "@/schemas/playground";

const PlaygroundPage = () => {
  const {
    playgrounds,
    fetchPlaygrounds,
    loading,
    error,
    meta,
    nextPage,
    previousPage,
    currentPage,
    addPlayground,
    removePlayground,
  } = usePlaygroundStore();

  useEffect(() => {
    fetchPlaygrounds();
  }, [fetchPlaygrounds]);

  const playgroundList = playgrounds || [];

  const paginationMeta = meta || {
    count: 0,
    next: null,
    previous: null,
  };

  // ================= CREATE =================
  const handleCreate = async (data: PlaygroundFormValues) => {
    try {
      await addPlayground(data);
      toast.success("Playground created successfully 🚀");
    } catch {
      toast.error("Failed to create playground.");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    try {
      await removePlayground(id);
      toast.success("Playground deleted successfully!");
    } catch {
      toast.error("Failed to delete playground.");
    }
  };

  return (
    <div className="px-7 py-5">
      <Card className="shadow-lg">
        <CardHeader className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-2xl font-semibold">
              API Playground
            </CardTitle>
            <CardDescription className="text-gray-600">
              Test and manage your API playground requests.
            </CardDescription>
          </div>

          <PlaygroundDialog onSubmitParent={handleCreate} />
        </CardHeader>

        <CardContent className="mt-4">
          {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

          <DataTable
            columns={getColumns({
              handleDelete,
            })}
            data={playgroundList}
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

export default PlaygroundPage;
