import Pagination from "@/components/Pagination";
import UserRow, { UserRowProps } from "@/components/UserRow";
import Base from "@/templates/Base";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";

const mockUser: UserRowProps[] = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  name: index + " Fernandes",
  email: `fernandes${index}@gmail.com`,
  createdAt: "04 de Abril, 2021"
}));

const UserList = () => {
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
    <Base>
      <Box flex="1" borderRadius={8} bg="gray.800" p={["4", "8"]}>
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Usuário
          </Heading>
          <Link href="/student/create" passHref>
            <Button
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} />}
            >
              Cria novo usuário
            </Button>
          </Link>
        </Flex>

        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              {/* <Th px="2" color="gray.300" width="1">
                <Checkbox colorScheme="pink" />
              </Th> */}
              <Th>Usuários</Th>
              {isDrawerSidebar && <Th>Data de cadastro</Th>}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {mockUser.map((user) => (
              <UserRow key={user.id} {...user} />
            ))}
          </Tbody>
        </Table>
        <Pagination />
      </Box>
    </Base>
  );
};

export default UserList;
