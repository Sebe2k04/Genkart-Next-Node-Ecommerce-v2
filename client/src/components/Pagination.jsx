import React, { useState } from "react";
import { IconButton, Typography } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useGlobalContext } from "@/context/GlobalProvider";

const Pagination = () => {
  const { pagination, setPagination } = useGlobalContext();
  const next = () => {
    if (pagination.currentPage === pagination.totalPages) return;

    setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
  };

  const prev = () => {
    if (pagination === 1) return;
    setPagination({ ...pagination, currentPage: pagination.currentPage - 1 });
  };

  return (
    <div className="flex items-center gap-8">
      <IconButton
        size="sm"
        variant="outlined"
        onClick={prev}
        disabled={pagination.currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <Typography color="gray" className="font-normal">
        Page <strong className="text-gray-900">{pagination.currentPage}</strong>{" "}
        of <strong className="text-gray-900">{pagination.totalPages}</strong>
      </Typography>
      <IconButton
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={pagination.currentPage === pagination.totalPages}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
};

export default Pagination;
