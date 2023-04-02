import { axiosInstance, Endpoints } from "@/api";
import Pagination from "@/components/Pagination";
import UserRow from "@/components/UserRow";
import { useNotification } from "@/contexts/AlertMessageContext";
import useAsync from "@/hook/useAsync";
import usePageTitle from "@/hook/usePageTitle";
import { IStudentResponse } from "@/services";
import Base from "@/templates/Base";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Spinner,
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

type IStudentGet = {
  page: string;
  take?: string;
};

const UserList = () => {
  usePageTitle("Alunos");
  const notification = useNotification();
  const isDrawerSidebar = useBreakpointValue(
    {
      base: false,
      lg: true
    },
    {
      fallback: "lg"
    }
  );

  const handleListStudents = async (args: IStudentGet) => {
    try {
      const reponse = await axiosInstance.get(Endpoints.student.list(), {
        params: {
          page: args.page,
          take: 7
        }
      });

      return reponse.data;
    } catch (error) {
      notification.showAlert({
        title: "Erro ao listar alunos",
        description: "Ocorreu um erro ao listar os alunos",
        status: "error"
      });
    }
  };

  const { data, execute, isLoading } = useAsync<IStudentResponse, IStudentGet>(
    handleListStudents
  );

  const handlePageChange = (page: number) => {
    execute({
      page: page.toString()
    });
  };

  useEffect(() => {
    execute({
      page: "1"
    });
  }, []);

  return (
    <Base>
      <Box
        display="flex"
        flexDirection="column"
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
        {isLoading ? (
          <Box
            flex={1}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="300px"
          >
            <Spinner />
          </Box>
        ) : (
          <Box flex={1}>
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
                {data?.items &&
                  data?.items.map((user) => (
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
          </Box>
        )}

        <Box>
          <Pagination
            onPageChange={handlePageChange}
            totalPages={data?.meta.totalPages}
            currentPage={data?.meta.currentPage}
            totalItems={data?.meta.totalItems}
            itemsPerPage={data?.meta.itemsPerPage}
          />
        </Box>
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
