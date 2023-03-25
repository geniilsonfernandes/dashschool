import theme from "@/styles/theme";
import Base from "@/templates/Base";
import {
  Avatar,
  Box,
  Flex,
  Heading,
  HStack,
  Text,
  VStack
} from "@chakra-ui/react";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
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

const dashboard = () => {
  return (
    <Base>
      <Box width="100%">
        <Heading size="lg" margin="16px 0" fontWeight="normal">
          Cursos
        </Heading>
        <Flex
          gap="16px"
          flexFlow="wrap"
          flexDirection={{ base: "column", lg: "row" }}
        >
          {[1, 2, 3, 5, 6, 23, 412].map((item) => (
            <Flex
              width={{ base: "100%", lg: "350px" }}
              key={item}
              p="4"
              bg="gray.800"
              borderRadius={8}
              gap="4"
            >
              <Avatar name="n" />
              <Box flex="1" mr="4">
                <Text fontSize="18px" fontWeight="bold">
                  Curso de node
                </Text>
                <Text fontSize="small" color="gray.300">
                  curso de node descrição
                </Text>
              </Box>

              <Box>
                <Link href="/">
                  <RiExternalLinkLine size="24" />
                </Link>
              </Box>
            </Flex>
          ))}
        </Flex>
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

export default dashboard;
