"use client";

import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTable } from "@/components/tables/endpoint/data-table";
import { getColumns } from "@/components/tables/endpoint/colums";

import { useEndpointStore } from "@/store/endpoint.store";

import { EndpointDialog } from "@/components/dashboard/endpoints/endpoint-dialog";

import { toast } from "sonner";
import { EndpointFormValues } from "@/schemas/endpoint";

const EndpointsPage = () => {
  const {
    endpoints,
    fetchEndpoints,
    loading,
    error,
    meta,
    nextPage,
    previousPage,
    currentPage,
    addEndpoint,
    editEndpoint,
    removeEndpoint,
    setSearch,
    setSorting,
  } = useEndpointStore();

  useEffect(() => {
    fetchEndpoints();
  }, []);

  const endpointsList = endpoints || [];
  const paginationMeta = meta || {
    count: 0,
    next: null,
    previous: null,
  };

  // ================= ADD / EDIT =================
  const handleAddOrEdit = async (data: EndpointFormValues, id?: string) => {
    if (id) {
      await editEndpoint(id, data);
      toast.success("Endpoint updated successfully!");
    } else {
      await addEndpoint(data);
      toast.success("Endpoint added successfully!");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    try {
      await removeEndpoint(id);
      toast.success("Endpoint deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete endpoint.");
    }
  };

  return (
    <div className="px-7 py-5">
      <Card className="shadow-lg">
        <CardHeader className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-2xl font-semibold">
              API Endpoints
            </CardTitle>
            <CardDescription className="text-gray-600">
              Manage all your API endpoints here.
            </CardDescription>
          </div>

          <EndpointDialog onSubmitParent={handleAddOrEdit} />
        </CardHeader>

        <CardContent className="mt-4">
          {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

          <DataTable
            columns={getColumns({
              handleDelete,
              handleEdit: handleAddOrEdit,
            })}
            data={endpointsList}
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

export default EndpointsPage;
