import { Box, Link, Stack, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { RiContactsLine, RiDashboardLine } from "react-icons/ri";

const Siderbar = () => {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <Box fontWeight="bold" color="gray.400" fontSize="small">
          <Text fontWeight="bold" color="gray.400" fontSize="small">
            Geral
          </Text>
          <Stack spacing="4" mt="8" align="stretch">
            <Link display="flex" alignItems="center">
              <Icon as={RiDashboardLine} />
              <Text ml="4" fontWeight="medium">
                Dashboard
              </Text>
            </Link>
            <Link display="flex" alignItems="center">
              <Icon as={RiContactsLine} />
              <Text ml="4" fontWeight="medium">
                usuários
              </Text>
            </Link>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Siderbar;
