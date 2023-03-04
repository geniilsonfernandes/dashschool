import { Text } from "@chakra-ui/react";
import React from "react";

type LogoProps = {
  brandName: string;
};
const Logo = ({ brandName }: LogoProps) => {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      width="64"
    >
      {brandName}
      <Text as="span" color="pink.500" marginLeft="1">
        .
      </Text>
    </Text>
  );
};

export default Logo;
