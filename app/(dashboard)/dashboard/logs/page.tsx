"use client";

import { useEffect } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getColumns } from "@/components/tables/request-log/colums";
import { DataTable } from "@/components/tables/playground/data-table";

import { useRequestLogStore } from "@/store/request-log.store";

const RequestLogPage = () => {
  const {
    logs,
    fetchLogs,
    loading,
    error,
    meta,
    nextPage,
    previousPage,
    currentPage,
  } = useRequestLogStore();

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const logList = logs || [];

  const paginationMeta = meta || {
    count: 0,
    next: null,
    previous: null,
  };

  return (
    <div className="px-7 py-5">
      <Card className="shadow-lg">
        <CardHeader className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-2xl font-semibold">
              Request Logs
            </CardTitle>
            <CardDescription className="text-gray-600">
              Monitor and analyze API request logs.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="mt-4">
          {error && <div className="text-red-500 mb-4 text-sm">{error}</div>}

          <DataTable
            columns={getColumns()}
            data={logList}
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

export default RequestLogPage;
