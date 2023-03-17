import Head from "@/components/Head/Head";
import Base from "@/templates/Base";
import {
  Box,
  Button,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

const Courses = () => {
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
      <Box
        flex="1"
        borderRadius={8}
        bg="gray.800"
        p={["4", "8"]}
        minHeight="80vh"
      >
        <Head title="Cursos">
          <Link href="/courses/create" passHref>
            <Button
              size="sm"
              fontSize="sm"
              colorScheme="facebook"
              leftIcon={<Icon as={RiAddLine} />}
            >
              Cria novo curso
            </Button>
          </Link>
        </Head>

        <Box flex={1}>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>Curso</Th>
                <Th>Horas</Th>
                {isDrawerSidebar && <Th>Alunos</Th>}
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <Box>
                    <Text fontWeight="bold">mate</Text>
                    <Text fontSize="small" color="gray.300">
                      Lorem, ipsum dolor sit amet
                    </Text>
                  </Box>
                </Td>
                <Td>10h</Td>
                {isDrawerSidebar && <Td>10</Td>}
                <Td p="0">
                  <Flex justify="flex-end">
                    <Link href={`/student/edit/10`}>
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
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Base>
  );
};

export default Courses;
