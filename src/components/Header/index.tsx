import { Flex, Text, Icon, Input, HStack, Box, Avatar } from "@chakra-ui/react";
import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine
} from "react-icons/ri";
import React from "react";

const Header = () => {
  return (
    <Flex
      as="header"
      height="20"
      maxWidth={1480}
      marginX="auto"
      marginTop="4"
      paddingX="6"
      justify="space-between"
      align="center"
      w="100%"
      my="6"
      mx="auto"
      px="6"
    >
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

      <Flex
        as="label"
        flex="1"
        paddingY="4"
        paddingX="8"
        marginLeft="6"
        alignSelf="center"
        align="center"
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
        maxWidth={400}
      >
        <Input
          color="gray.50"
          variant="unstyled"
          paddingX="4"
          marginRight="4"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: "gray.400" }}
        />
        <Icon as={RiSearchLine} fontSize="20" />
      </Flex>

      <Flex>
        <HStack
          spacing={["6", "8"]}
          marginX={["6", "8"]}
          paddingRight={["6", "8"]}
          paddingY="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>
        <Flex align="center">
          {true && (
            <Box marginRight="4" textAlign="right">
              <Text>genilson</Text>
              <Text color="gray.300" fontSize="small">
                ddfdfdfd
              </Text>
            </Box>
          )}

          <Avatar size="md" name="ds" src="" />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
