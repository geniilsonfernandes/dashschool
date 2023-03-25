import { axiosInstance, Endpoints } from "@/api";
import useAsync from "@/hook/useAsync";
import { IListCoursesResponse } from "@/services/courseServive";
import theme from "@/styles/theme";
import Base from "@/templates/Base";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  Spinner,
  Text,
  VStack
} from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect } from "react";
import { RiExternalLinkLine } from "react-icons/ri";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const options = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: "#fff"
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  }
};
const series = [
  {
    name: "series1",
    data: [31, 40, 28, 51, 42, 109, 100]
  }
];

type CourseGetTypes = {
  page: string;
};
type CourseGetResponse = {
  items: IListCoursesResponse[];
  meta: {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
};

const Dashboard = () => {
  const handleListCourse = async (values: CourseGetTypes) => {
    try {
      const reponse = await axiosInstance.get(Endpoints.course.list(), {
        params: {
          page: values.page,
          take: 5
        }
      });

      return reponse.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { execute, data, isLoading } = useAsync<
    CourseGetResponse,
    CourseGetTypes
  >(handleListCourse);

  useEffect(() => {
    execute({ page: "1" });
  }, []);

  return (
    <Base>
      <Box width="100%">
        <Box
          minHeight={["100px", "150px"]}
          bg="purple.500"
          borderRadius={8}
        ></Box>

        <Box
          padding={4}
          borderStyle="solid"
          borderWidth="1px"
          borderColor="gray.800"
          borderRadius="8px"
          marginTop="8px"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="lg" fontWeight="bold">
              Cursos
            </Heading>
            <Link href={`/courses`}>
              <Text fontSize="18px" fontWeight="bold" mt="8px">
                Ver todos
              </Text>
            </Link>
          </Flex>
          <Box
            display="grid"
            gridTemplateColumns={["repeat(1, 1fr)", "repeat(4, 1fr)"]}
            gap="8"
            mt={["8px", "16px"]}
          >
            {data?.items &&
              data.items.map((item) => (
                <Flex
                  width={{ base: "100%" }}
                  key={item.id}
                  p="4"
                  bg="gray.800"
                  borderRadius={8}
                  gap="4"
                >
                  <Box flex="1">
                    <Avatar
                      name={item.name.substring(0, 1)}
                      backgroundColor={theme.colors.purple[500]}
                    />
                    <Text fontSize="18px" fontWeight="bold" mt="8px">
                      {item.name}
                    </Text>
                    <Text fontSize="small" color="gray.300">
                      {item.description}
                    </Text>
                  </Box>

                  <Box>
                    <Link href={`courses/edit/${item.id}`}>
                      <RiExternalLinkLine size="24" />
                    </Link>
                  </Box>
                </Flex>
              ))}
          </Box>
        </Box>
        <Chart options={options} series={series} type="area" height={160} />
      </Box>
    </Base>
  );
};

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

export default Dashboard;
