import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";

type MenuSectionProps = {
  children: React.ReactNode;
  title: string;
};
const MenuSection = ({ children, title }: MenuSectionProps) => {
  return (
    <Stack spacing="12" align="flex-start">
      <Box fontWeight="bold" color="gray.400" fontSize="small">
        <Text fontWeight="bold" color="gray.400" fontSize="small">
          {title}
        </Text>
        <Stack spacing="4" mt="8" align="stretch">
          {children}
        </Stack>
      </Box>
    </Stack>
  );
};

export default MenuSection;
