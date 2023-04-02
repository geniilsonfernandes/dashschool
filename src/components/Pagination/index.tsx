import { usePagination } from "@/hook/usePagination";
import { Box, Button, Stack } from "@chakra-ui/react";
import { useState } from "react";

type PaginationProps = {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
};
const Pagination = ({
  onPageChange,
  totalPages = 0,
  totalItems = 0,
  itemsPerPage = 0,
  currentPage = 1
}: PaginationProps) => {
  const [curPage, setCurPage] = useState(currentPage);
  const { sequence } = usePagination({
    curPage: curPage || 1,
    numPages: totalPages || 1,
    numPagesAroundCurrent: 2
  });

  const handlePageChange = (page: number) => {
    setCurPage(page);
    onPageChange(page);
  };

  return (
    <Stack
      direction="row"
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>{(currentPage - 1) * itemsPerPage}</strong> -{" "}
        <strong>
          {currentPage === totalPages ? totalItems : itemsPerPage * currentPage}
        </strong>{" "}
        de <strong>{totalItems}</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {sequence.map((page) => (
          <Button
            key={page}
            size="sm"
            fontSize="xs"
            width="4"
            bg={currentPage === page ? "gray.500" : "gray.900"}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default Pagination;
