import { Text } from "@chakra-ui/react";
import React from "react";

const Logo = () => {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      width="64"
    >
      dashgo
      <Text as="span" color="pink.500" marginLeft="1">
        .
      </Text>
    </Text>
  );
};

export default Logo;
