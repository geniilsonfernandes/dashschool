import { axiosInstance, Endpoints } from "@/api";
import CourseRow from "@/components/CourseRow";
import Head from "@/components/Head/Head";
import useAsync from "@/hook/useAsync";
import { IListCoursesResponse } from "@/services/courseServive";
import Base from "@/templates/Base";
import {
  Box,
  Button,
  Icon,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiAddLine } from "react-icons/ri";

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

  const handleListStudents = async (args: any) => {
    try {
      const reponse = await axiosInstance.get(Endpoints.course.list(), {});

      console.log(reponse.data);

      return reponse.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { execute, data } = useAsync<
    {
      items: IListCoursesResponse[];
    },
    any
  >(handleListStudents);

  useEffect(() => {
    execute();
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
              {data &&
                data.items.map((course) => (
                  <CourseRow
                    key={course.id}
                    description={course.description}
                    duration={course.duration}
                    name={course.name}
                    students={course.Courses_Students.length}
                  />
                ))}
            </Tbody>
          </Table>
        </Box>
      </Box>
    </Base>
  );
};

export default Courses;
