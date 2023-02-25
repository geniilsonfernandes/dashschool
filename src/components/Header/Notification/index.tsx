import { HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

const Notification = () => {
  return (
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
  );
};

export default Notification;
