import cutString from "@/utils/cutString";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { RiExternalLinkLine } from "react-icons/ri";

type ResultItemProps = {
  name: string;
  id: string;
  type: "student" | "courses";
};

const ResultItem = ({ id, name, type = "student" }: ResultItemProps) => {
  const createLink = `/${type}/edit/${id}`;

  return (
    <Box
      bg="gray.900"
      padding={2}
      borderRadius="md"
      width="100%"
      display="flex"
      justifyContent="space-between"
      _hover={{
        bg: "gray.700"
      }}
      cursor="pointer"
    >
      <Text>{cutString(name, 50)}</Text>
      <Link href={createLink}>
        <RiExternalLinkLine size="16" />
      </Link>
    </Box>
  );
};

export default ResultItem;
