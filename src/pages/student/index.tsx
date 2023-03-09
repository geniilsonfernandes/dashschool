import { axiosInstance, Endpoints } from "@/api";
import Pagination from "@/components/Pagination";
import UserRow, { UserRowProps } from "@/components/UserRow";
import useAsync from "@/hook/useAsync";
import { IStudentResponse } from "@/services";
import Base from "@/templates/Base";
import {
  Box,
  Button,
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
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine } from "react-icons/ri";

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

  const handleListStudents = async (page?: number) => {
    try {
      console.log(page);

      const reponse = await axiosInstance.get(Endpoints.student.list());

      return reponse.data.students;
    } catch (error) {
      console.log(error);
    }
  };

  type IStudentGet = {
    page: string;
  };
  const { isLoading, execute, data } = useAsync<
    IStudentResponse[],
    IStudentGet
  >(handleListStudents);

  useEffect(() => {
    execute({
      page: "1"
    });
  }, []);

  return (
    <Base>
      <Box
        flex="1"
        borderRadius={8}
        bg="gray.800"
        p={["4", "8"]}
        minHeight="80vh"
      >
        <Flex mb="8" justify="space-between" align="center">
          <Heading size="lg" fontWeight="normal">
            Alunos
          </Heading>
          <Link href="/student/create" passHref>
            <Button
              size="sm"
              fontSize="sm"
              colorScheme="facebook"
              leftIcon={<Icon as={RiAddLine} />}
            >
              Cria novo aluno
            </Button>
          </Link>
        </Flex>
        {isLoading && <p>Carregando...</p>}
        <Table colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              {/* <Th px="2" color="gray.300" width="1">
                <Checkbox colorScheme="facebook" />
              </Th> */}
              <Th>Alunos</Th>
              {isDrawerSidebar && <Th>Data de cadastro</Th>}
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.length !== undefined &&
              data.map((user) => (
                <UserRow
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  email={user.email}
                  createdAt={user.created_at}
                />
              ))}
          </Tbody>
        </Table>
        <Pagination />
      </Box>
    </Base>
  );
};

export default UserList;

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }

  return {
    props: { session }
  };
}
