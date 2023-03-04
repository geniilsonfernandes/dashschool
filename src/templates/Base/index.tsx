import Header from "@/components/Header";
import Siderbar from "@/components/Siderbar";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import React from "react";

type BaseProps = {
  children: React.ReactNode;
};

const Base = ({ children }: BaseProps) => {
  return (
    <Flex direction="column" h="100vh" aria-label="conteudo do site">
      <Header />
      <Flex maxWidth={1480} w="100%" my="6" mx="auto" px="6">
        <Siderbar />
        <SimpleGrid
          flex="1"
          gap="4"
          minChildWidth="320px"
          alignItems="flex-start"
        >
          {children}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default Base;
