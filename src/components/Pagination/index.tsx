import { Box, Button, Stack } from "@chakra-ui/react";
import React from "react";

const Pagination = () => {
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
            colorScheme="pink"
            disabled
            _disabled={{
              bg: "pink.500",
              cursor: "default"
            }}
          >
            {page}
          </Button>
        ))}
      </Stack>
    </Stack>
  );
};

export default Pagination;
