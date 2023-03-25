import {
  Box,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  Icon,
  useBreakpointValue
} from "@chakra-ui/react";
import Link from "next/link";
import { type } from "os";
import React from "react";
import { RiPencilLine } from "react-icons/ri";

type CourseRowProps = {
  name: string;
  description: string;
  id: string;
  duration: number;
  students: number;
};

const CourseRow = ({
  description,
  duration,
  name,
  students,
  id
}: CourseRowProps) => {
  const isDrawerSidebar = useBreakpointValue(
    {
      base: false,
      lg: true
    },
    {
      fallback: "lg"
    }
  );

  return (
    <Tr>
      <Td>
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="small" color="gray.300">
            {description.substring(0, 50)}
          </Text>
        </Box>
      </Td>
      <Td>{duration} Horas</Td>
      {isDrawerSidebar && <Td>{students}</Td>}
      <Td p="0">
        <Flex justify="flex-end">
          <Link href={`/courses/edit/${id}`}>
            <Button
              size="sm"
              fontSize="sm"
              colorScheme="purple"
              leftIcon={<Icon as={RiPencilLine} />}
            >
              Editar
            </Button>
          </Link>
        </Flex>
      </Td>
    </Tr>
  );
};

export default CourseRow;
