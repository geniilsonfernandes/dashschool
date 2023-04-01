import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";
import BannerImage from "../BannerImage";
type BannerProps = {
  name: string;
};
const Banner = ({ name }: BannerProps) => {
  return (
    <Box
      position="relative"
      minHeight={["100px", "150px"]}
      display="flex"
      justifyContent={["center", "space-between"]}
      bg="linear-gradient(142deg, #6a147700, #805ad5)"
      borderRadius={8}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        paddingLeft="64px"
      >
        <Heading>Olá,</Heading>
        <Text fontSize="18px" fontWeight="bold" mt="8px">
          {name}
        </Text>
      </Box>
      <Box position={"absolute"} right={16} bottom={0}>
        <BannerImage />
      </Box>
    </Box>
  );
};

export default Banner;
