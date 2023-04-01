import { HStack, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { RiUserAddLine } from "react-icons/ri";

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
      <Link href="/student/create">
        <Icon as={RiUserAddLine} fontSize="20" />
      </Link>
    </HStack>
  );
};

export default Notification;
