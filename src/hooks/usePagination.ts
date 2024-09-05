import { useState } from "react";

export const usePagination = (initialPage: number = 0, initialServicesPerPage: number = 4) => {
  const [page, setPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialServicesPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value - 1);
    window.scrollTo(0, 0);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setPage(0);
  };

  return {
    page,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
  };
};
