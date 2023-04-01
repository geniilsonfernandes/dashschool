import { axiosInstance, Endpoints } from "@/api";
import useAsync from "@/hook/useAsync";
import { IListCoursesResponse } from "@/services/courseServive";
import theme from "@/styles/theme";
import cutString from "@/utils/cutString";
import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect } from "react";
import { RiExternalLinkLine } from "react-icons/ri";

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

const Courses = () => {
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
        gridTemplateColumns={[
          "repeat(1, 1fr)",
          "repeat(1, 1fr)",
          "repeat(4, 1fr)"
        ]}
        gap="8"
        mt={["8px", "16px"]}
      >
        {isLoading &&
          Array.from({
            length: 8
          }).map((_, i) => (
            <Box
              key={i}
              width={{ base: "100%" }}
              p="4"
              height={40}
              bg="gray.800"
            />
          ))}

        {data?.items &&
          !isLoading &&
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
                  {cutString(item.description, 20)}
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
  );
};

export default Courses;
