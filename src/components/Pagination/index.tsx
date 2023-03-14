import { Box, Button, Stack } from "@chakra-ui/react";

type PaginationProps = {
  totalCountOfRegisters?: number;
  registersPerPage?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
};
const Pagination = ({ onPageChange }: PaginationProps) => {
  return (
    <Stack
      direction="row"
      spacing="6"
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {[1, 2, 3].map((page) => (
          <Button
            key={page}
            size="sm"
            fontSize="xs"
            width="4"
            colorScheme="facebook"
            bg="gray.500"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default Pagination;
