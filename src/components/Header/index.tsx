import { stylesConstants } from "@/styles";
import { Flex, useBreakpointValue, Icon } from "@chakra-ui/react";
import { useSession, signOut } from "next-auth/react";
import { RiMenuLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import Logo from "./Logo";
import Notification from "./Notification";
import Profile from "./Profile";
import Search from "./Search";

const Header = () => {
  const { onOpen } = useSidebarDrawer();
  const isWideVersion = useBreakpointValue(
    {
      base: false,
      lg: true
    },
    {
      fallback: "lg"
    }
  );

  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <Flex
      as="header"
      height="20"
      maxWidth={stylesConstants.APP_CONTENT_WIDTH}
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
      {!isWideVersion && (
        <Icon as={RiMenuLine} fontSize="24" onClick={onOpen} mr="4" />
      )}
      <Logo brandName="DashShool" />
      <Flex
        justifyContent={isWideVersion ? "space-between" : "flex-end"}
        flex="1"
      >
        {isWideVersion && <Search />}
        <Flex>
          <Notification />
          <Profile
            showProfileData={isWideVersion}
            email={session?.user?.email}
            name={session?.user?.name}
            onSignOut={handleSignOut}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
