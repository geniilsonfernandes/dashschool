import { axiosInstance, Endpoints } from "@/api";
import CourseRow from "@/components/CourseRow";
import Head from "@/components/Head/Head";
import Pagination from "@/components/Pagination";
import useAsync from "@/hook/useAsync";
import { IListCoursesResponse } from "@/services/courseServive";
import Base from "@/templates/Base";
import {
  Box,
  Button,
  Icon,
  Spinner,
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

type CourseGetTypes = {
  page: string;
};

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

  const handleListCourse = async (values: CourseGetTypes) => {
    try {
      const reponse = await axiosInstance.get(Endpoints.course.list(), {
        params: {
          page: values.page
        }
      });

      return reponse.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { execute, data, isLoading } = useAsync<
    {
      items: IListCoursesResponse[];
      meta: {
        currentPage: number;
        itemsPerPage: number;
        totalItems: number;
        totalPages: number;
      };
    },
    any
  >(handleListCourse);

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
                      id={course.id}
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

export default Courses;
