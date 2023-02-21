import Header from "@/components/Header";
import Siderbar from "@/components/Siderbar";
import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import theme from "@/styles/theme";

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
    <Flex direction="column" h="100vh">
      <Header />
      <Flex maxWidth={1480} w="100%" my="6" mx="auto" px="6">
        <Siderbar />
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          <Box p="8" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Inscrito da semana
            </Text>
            <Chart
              options={{
                ...options,

                xaxis: {
                  type: "datetime",
                  axisBorder: {
                    color: theme.colors.gray[600]
                  },
                  axisTicks: {
                    color: theme.colors.gray[600]
                  },
                  categories: Array.from({ length: 7 }, (_, i) =>
                    new Date(Date.now() + i * 24 * 60 * 60 * 1000)
                      .toISOString()
                      .slice(0, 10)
                  )
                },
                fill: {
                  opacity: 0.3,
                  type: "gradient",
                  gradient: {
                    shade: "dark",
                    opacityFrom: 0.7,
                    opacityTo: 0.3
                  }
                }
              }}
              series={series}
              type="area"
              width={"100%"}
              height={160}
            />
          </Box>
          <Box p="8" bg="gray.800" borderRadius={8}>
            <Text fontSize="lg" mb="4">
              Inscrito da semana
            </Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default dashboard;
