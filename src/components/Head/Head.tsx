import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

type HeadProps = {
  title: string;
  children?: React.ReactNode;
};
const Head = ({ title, children }: HeadProps) => {
  return (
    <Flex mb="8" justify="space-between" align="center">
      <Heading size="lg" fontWeight="normal">
        {title}
      </Heading>
      {children}
    </Flex>
  );
};

export default Head;
