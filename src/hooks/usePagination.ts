import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export const usePagination = (initialPage: number = 0, initialServicesPerPage: number = 4) => {
  const [page, setPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialServicesPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
    window.scrollTo(0, 0);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    setItemsPerPage(event.target.value as number);
    setPage(0);
  };

  return {
    page,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
  };
};
