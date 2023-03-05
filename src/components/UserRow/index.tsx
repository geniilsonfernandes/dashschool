import {
  Box,
  Button,
  Flex,
  Icon,
  Td,
  Text,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react";
import Link from "next/link";
import { RiPencilLine } from "react-icons/ri";

export type UserRowProps = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

const UserRow = ({ createdAt, email, id, name }: UserRowProps) => {
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
      {/* <Td px="2">
        <Checkbox colorScheme="facebook" />
      </Td> */}
      <Td>
        <Box>
          <Text fontWeight="bold">{name}</Text>
          <Text fontSize="small" color="gray.300">
            {email}
          </Text>
        </Box>
      </Td>
      {isDrawerSidebar && <Td>{createdAt}</Td>}
      <Td p="0">
        <Flex justify="flex-end">
          <Link href={`/student/edit/${id}`}>
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

export default UserRow;
